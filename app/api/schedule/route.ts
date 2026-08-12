import { NextRequest, NextResponse } from "next/server";

type NaverGame = {
  gameId: string;
  gameDate: string;
  gameDateTime?: string;
  timeTbd?: boolean;
  homeTeamName: string;
  awayTeamName: string;
  cancel?: boolean;
  postponed?: boolean;
};

function normalize(value: string) {
  return value.toLowerCase().replace(/\b(fc|afc)\b/g, "").replace(/\s|[().·-]/g, "");
}

function matches(actual: string, target: string) {
  const a = normalize(actual);
  const t = normalize(target);
  return a === t || a.includes(t) || t.includes(a);
}

export async function GET(request: NextRequest) {
  const sport = request.nextUrl.searchParams.get("sport") ?? "";
  const category = request.nextUrl.searchParams.get("category") ?? "";
  const team = request.nextUrl.searchParams.get("team") ?? "";
  const month = request.nextUrl.searchParams.get("month") ?? "";
  if (!sport || !category || !team || !/^\d{4}-\d{2}$/.test(month)) {
    return NextResponse.json({ error: "잘못된 일정 요청입니다." }, { status: 400 });
  }

  const [year, monthNumber] = month.split("-").map(Number);
  const lastDay = new Date(year, monthNumber, 0).getDate();
  const params = new URLSearchParams({ categoryId: category, size: "500", fields: "basic,schedule,matchRound,round,groupName,conference,neutralGround,postponed" });

  if (category === "kleague" || category === "kleague2") {
    params.set("superCategoryId", "kfootball");
    params.set("season", String(year));
  } else {
    if (sport === "basketball" || sport === "volleyball") params.set("superCategoryId", sport);
    else params.set("upperCategoryId", sport);
    params.set("fromDate", `${month}-01`);
    params.set("toDate", `${month}-${String(lastDay).padStart(2, "0")}`);
  }

  try {
    const response = await fetch(`https://api-gw.sports.naver.com/schedule/games?${params}`, {
      headers: { "User-Agent": "Mozilla/5.0", Referer: "https://m.sports.naver.com/" },
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`upstream ${response.status}`);
    const payload = await response.json() as { success?: boolean; result?: { games?: NaverGame[] } };
    const allGames = payload.result?.games ?? [];
    const games = allGames
      .filter((game) => game.gameDate.startsWith(month))
      .filter((game) => matches(game.homeTeamName, team) || matches(game.awayTeamName, team))
      .map((game) => {
        const home = matches(game.homeTeamName, team);
        return {
          id: game.gameId,
          date: game.gameDate,
          opponent: home ? game.awayTeamName : game.homeTeamName,
          time: game.timeTbd ? "미정" : (game.gameDateTime?.slice(11, 16) || "미정"),
          home,
        };
      });

    return NextResponse.json({ games, syncedAt: new Date().toISOString(), source: "Naver Sports" }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "공개 일정 소스에 연결할 수 없습니다." }, { status: 502 });
  }
}
