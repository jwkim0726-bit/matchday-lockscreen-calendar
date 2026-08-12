"use client";

import { ChangeEvent, PointerEvent, useEffect, useMemo, useRef, useState } from "react";

type Team = {
  id: string;
  sport: "kbaseball" | "kfootball" | "wfootball" | "volleyball" | "basketball";
  league: string;
  category: string;
  scheduleName: string;
  city: string;
  name: string;
  short: string;
  primary: string;
  secondary: string;
  mascot: string;
};

type Game = {
  id: string;
  date: string;
  opponent: string;
  time: string;
  home: boolean;
};

type Device = {
  id: string;
  family: string;
  name: string;
  year: number;
  width: number;
  height: number;
};

const t = (sport: Team["sport"], league: string, category: string, id: string, scheduleName: string, city: string, name: string, short: string, primary: string, secondary: string, mascot: string): Team => ({ sport, league, category, id, scheduleName, city, name, short, primary, secondary, mascot });

const teams: Team[] = [
  t("kbaseball", "KBO", "kbo", "kbo-lg", "LG", "SEOUL", "LG TWINS", "LG", "#C30452", "#B9D7F2", "쌍둥이"), t("kbaseball", "KBO", "kbo", "kbo-kia", "KIA", "GWANGJU", "KIA TIGERS", "KIA", "#EA0029", "#FFD2D8", "호랑이"), t("kbaseball", "KBO", "kbo", "kbo-hanwha", "한화", "DAEJEON", "HANWHA EAGLES", "HH", "#F37321", "#FFD7B7", "독수리"), t("kbaseball", "KBO", "kbo", "kbo-samsung", "삼성", "DAEGU", "SAMSUNG LIONS", "SS", "#074CA1", "#C5D9F2", "사자"), t("kbaseball", "KBO", "kbo", "kbo-lotte", "롯데", "BUSAN", "LOTTE GIANTS", "LT", "#041E42", "#D9E3F2", "거인"), t("kbaseball", "KBO", "kbo", "kbo-doosan", "두산", "SEOUL", "DOOSAN BEARS", "DB", "#131230", "#D2D1E5", "곰"), t("kbaseball", "KBO", "kbo", "kbo-ssg", "SSG", "INCHEON", "SSG LANDERS", "SSG", "#CE0E2D", "#FFD0D8", "랜디"), t("kbaseball", "KBO", "kbo", "kbo-nc", "NC", "CHANGWON", "NC DINOS", "NC", "#315288", "#D5DDEA", "공룡"), t("kbaseball", "KBO", "kbo", "kbo-kt", "KT", "SUWON", "KT WIZ", "KT", "#000000", "#E2E2E2", "마법사"), t("kbaseball", "KBO", "kbo", "kbo-kiwoom", "키움", "SEOUL", "KIWOOM HEROES", "KH", "#570514", "#E5C9CF", "영웅"),

  t("kfootball", "K리그1", "kleague", "kleague-ulsan", "울산", "ULSAN", "ULSAN HD", "UH", "#005BAC", "#A9D7F5", "호랑이"), t("kfootball", "K리그1", "kleague", "kleague-seoul", "서울", "SEOUL", "FC SEOUL", "FC", "#B5193F", "#F0C6D0", "서울이"), t("kfootball", "K리그1", "kleague", "kleague-jeonbuk", "전북", "JEONJU", "JEONBUK HYUNDAI", "JB", "#007A3D", "#BEE7D1", "나이티"), t("kfootball", "K리그1", "kleague", "kleague-pohang", "포항", "POHANG", "POHANG STEELERS", "PS", "#D71920", "#F3C2C4", "쇠돌이"), t("kfootball", "K리그1", "kleague", "kleague-daejeon", "대전", "DAEJEON", "DAEJEON HANA", "DH", "#6F1D86", "#E5CCE9", "대전이"), t("kfootball", "K리그1", "kleague", "kleague-gangwon", "강원", "GANGWON", "GANGWON FC", "GW", "#F36F21", "#FFD6B8", "강웅이"), t("kfootball", "K리그1", "kleague", "kleague-gwangju", "광주", "GWANGJU", "GWANGJU FC", "GJ", "#F7B500", "#FFE7A6", "보니"), t("kfootball", "K리그1", "kleague", "kleague-jeju", "제주", "JEJU", "JEJU SK", "JJ", "#E84B10", "#FFD1C0", "감규리"), t("kfootball", "K리그1", "kleague", "kleague-gimcheon", "김천", "GIMCHEON", "GIMCHEON SANGMU", "GS", "#B21F2D", "#ECC8CC", "슈웅"), t("kfootball", "K리그1", "kleague", "kleague-incheon", "인천", "INCHEON", "INCHEON UNITED", "IU", "#0066B3", "#BBDDFA", "유티"), t("kfootball", "K리그1", "kleague", "kleague-anyang", "안양", "ANYANG", "FC ANYANG", "AY", "#5B2C83", "#DECFEB", "바티"), t("kfootball", "K리그1", "kleague", "kleague-bucheon", "부천", "BUCHEON", "BUCHEON FC 1995", "BC", "#C51B3A", "#F2C6CE", "헤르"),

  t("wfootball", "프리미어리그", "epl", "epl-arsenal", "아스널", "LONDON", "ARSENAL", "ARS", "#EF0107", "#FFD2D4", "거너사우루스"), t("wfootball", "프리미어리그", "epl", "epl-liverpool", "리버풀", "LIVERPOOL", "LIVERPOOL", "LIV", "#C8102E", "#F4C2CC", "마이티 레드"), t("wfootball", "프리미어리그", "epl", "epl-mancity", "맨시티", "MANCHESTER", "MANCHESTER CITY", "MCI", "#6CABDD", "#D3EBF7", "문체스터"), t("wfootball", "프리미어리그", "epl", "epl-manunited", "맨유", "MANCHESTER", "MANCHESTER UNITED", "MUN", "#DA291C", "#F4CEC9", "프레드"), t("wfootball", "프리미어리그", "epl", "epl-tottenham", "토트넘", "LONDON", "TOTTENHAM", "TOT", "#132257", "#D3D9EA", "처피"), t("wfootball", "프리미어리그", "epl", "epl-chelsea", "첼시", "LONDON", "CHELSEA", "CHE", "#034694", "#C6DBF1", "스탬퍼드"),
  t("wfootball", "라리가", "primera", "laliga-real", "레알 마드리드", "MADRID", "REAL MADRID", "RMA", "#1B3C73", "#D6E2F4", "마드리디스타"), t("wfootball", "라리가", "primera", "laliga-barca", "바르셀로나", "BARCELONA", "FC BARCELONA", "BAR", "#A50044", "#EDC8D7", "바르사"), t("wfootball", "라리가", "primera", "laliga-atleti", "AT 마드리드", "MADRID", "ATLETICO MADRID", "ATM", "#CB3524", "#F5CCC7", "인디"),
  t("wfootball", "분데스리가", "bundesliga", "bundes-bayern", "바이에른 뮌헨", "MUNICH", "BAYERN MUNICH", "FCB", "#DC052D", "#F2C3CD", "베르니"), t("wfootball", "분데스리가", "bundesliga", "bundes-dortmund", "도르트문트", "DORTMUND", "BORUSSIA DORTMUND", "BVB", "#FDE100", "#FFF4A6", "엠마"), t("wfootball", "세리에A", "seria", "serie-inter", "인터 밀란", "MILAN", "INTER MILAN", "INT", "#0068A8", "#C1E2F3", "개구리"), t("wfootball", "세리에A", "seria", "serie-milan", "AC 밀란", "MILAN", "AC MILAN", "ACM", "#FB090B", "#F9C3C4", "밀라넬로"), t("wfootball", "리그1", "ligue1", "ligue1-psg", "파리 생제르맹", "PARIS", "PARIS SAINT-GERMAIN", "PSG", "#004170", "#C2DAEA", "제르맹"),

  t("volleyball", "V리그 남자부", "kovo", "kovo-koreanair", "대한항공", "INCHEON", "KOREAN AIR JUMBOS", "KA", "#2B5FAB", "#C8DAF2", "점보스"), t("volleyball", "V리그 남자부", "kovo", "kovo-hyundai", "현대캐피탈", "CHEONAN", "HYUNDAI CAPITAL", "HC", "#111C4E", "#CFD3E6", "몰리"), t("volleyball", "V리그 남자부", "kovo", "kovo-kepco", "한국전력", "SUWON", "KEPCO VIXTORM", "KE", "#E84C3D", "#F6CFCB", "빛나"), t("volleyball", "V리그 남자부", "kovo", "kovo-wooricard", "우리카드", "SEOUL", "WOORI CARD", "WC", "#1D4D9B", "#CBDCF1", "위비"), t("volleyball", "V리그 남자부", "kovo", "kovo-ok", "OK저축은행", "ANSAN", "OKMAN", "OK", "#E8382F", "#F6C9C6", "읏맨"), t("volleyball", "V리그 남자부", "kovo", "kovo-kb", "KB손해보험", "UIJEONGBU", "KB STARS", "KB", "#F7B500", "#FFE7A3", "스타즈"), t("volleyball", "V리그 남자부", "kovo", "kovo-samsung", "삼성화재", "DAEJEON", "SAMSUNG BLUEFANGS", "SB", "#0A4E9B", "#C7DDF2", "블루팡스"),
  t("volleyball", "V리그 여자부", "wkovo", "wkovo-heungkuk", "흥국생명", "INCHEON", "PINK SPIDERS", "PS", "#E5007D", "#F8C5E1", "핑크스파이더"), t("volleyball", "V리그 여자부", "wkovo", "wkovo-hillstate", "현대건설", "SUWON", "HILLSTATE", "HS", "#0068B5", "#C4E1F4", "힐리"), t("volleyball", "V리그 여자부", "wkovo", "wkovo-gs", "GS칼텍스", "SEOUL", "GS CALTEX", "GS", "#007A3D", "#C3E7D4", "킥시"), t("volleyball", "V리그 여자부", "wkovo", "wkovo-ibk", "IBK기업은행", "HWASEONG", "IBK ALTOS", "IBK", "#1E5AA8", "#CDDEF2", "알토스"), t("volleyball", "V리그 여자부", "wkovo", "wkovo-koreaexpress", "한국도로공사", "GIMCHEON", "HI-PASS", "HP", "#0071BB", "#C6E4F6", "하이"), t("volleyball", "V리그 여자부", "wkovo", "wkovo-kgc", "정관장", "DAEJEON", "RED SPARKS", "RS", "#D71920", "#F3C6C9", "레드스파크"), t("volleyball", "V리그 여자부", "wkovo", "wkovo-peppers", "페퍼저축은행", "GWANGJU", "AI PEPPERS", "AP", "#E51937", "#F5C9D0", "페퍼"),

  t("basketball", "KBL", "kbl", "kbl-sk", "서울 SK", "SEOUL", "SEOUL SK KNIGHTS", "SK", "#E31837", "#F5C6CF", "덩키"), t("basketball", "KBL", "kbl", "kbl-lg", "창원 LG", "CHANGWON", "LG SAKERS", "LG", "#C30452", "#EAC2D0", "세이커스"), t("basketball", "KBL", "kbl", "kbl-kt", "수원 KT", "SUWON", "KT SONICBOOM", "KT", "#000000", "#DEDEDE", "소닉붐"), t("basketball", "KBL", "kbl", "kbl-kcc", "부산 KCC", "BUSAN", "KCC EGIS", "KCC", "#183884", "#CED8EF", "이지스"), t("basketball", "KBL", "kbl", "kbl-db", "원주 DB", "WONJU", "DB PROMY", "DB", "#168A5B", "#C6E6D9", "프로미"), t("basketball", "KBL", "kbl", "kbl-mob", "울산 현대모비스", "ULSAN", "HYUNDAI MOBIS", "HM", "#E60012", "#F6C3C7", "피버스"), t("basketball", "KBL", "kbl", "kbl-samsung", "서울 삼성", "SEOUL", "SAMSUNG THUNDERS", "ST", "#074CA1", "#C8DAF0", "썬더스"), t("basketball", "KBL", "kbl", "kbl-gas", "대구 한국가스공사", "DAEGU", "KOGAS PEGASUS", "KP", "#1E3D8F", "#CFD8EF", "페가수스"), t("basketball", "KBL", "kbl", "kbl-kgc", "안양 정관장", "ANYANG", "RED BOOSTERS", "RB", "#D71920", "#F2C7CA", "레드부스터"), t("basketball", "KBL", "kbl", "kbl-sono", "고양 소노", "GOYANG", "SONO SKYGUNNERS", "SO", "#7B2D8E", "#E5D1EA", "스카이거너"),
  t("basketball", "NBA", "nba", "nba-lakers", "LA 레이커스", "LOS ANGELES", "LA LAKERS", "LAL", "#552583", "#FDB927", "레이커걸"), t("basketball", "NBA", "nba", "nba-warriors", "골든스테이트", "SAN FRANCISCO", "GOLDEN STATE", "GSW", "#1D428A", "#FFC72C", "썬더"), t("basketball", "NBA", "nba", "nba-boston", "보스턴", "BOSTON", "CELTICS", "BOS", "#007A33", "#BA9653", "럭키"), t("basketball", "NBA", "nba", "nba-knicks", "뉴욕 닉스", "NEW YORK", "KNICKS", "NYK", "#006BB6", "#F58426", "닉스"), t("basketball", "NBA", "nba", "nba-bulls", "시카고", "CHICAGO", "BULLS", "CHI", "#CE1141", "#F2C5D0", "베니"), t("basketball", "NBA", "nba", "nba-miami", "마이애미", "MIAMI", "HEAT", "MIA", "#98002E", "#F9A01B", "버니"),
];

const saveHeadlines = [
  "이번 달도\n또 속아봅시다",
  "이 팀을 응원하는 데\n이유가 있었나요",
  "또 한 달,\n같은 팀을 좋아하기로 했습니다",
  "이번 달도 우리 일상은\n경기 일정에 맞춰 흘러갑니다",
  "좋아하는 팀은 바꿀 수 없어도,\n배경화면은 바꿀 수 있습니다",
  "이번 달도 희망과 혈압을\n함께 챙겨드립니다",
];

const preferenceStorageKey = "matchday-preferences";

function sortTeamsAlphabetically(items: Team[]) {
  return [...items].sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
}

function firstTeamFor(sport: Team["sport"], league?: string) {
  return sortTeamsAlphabetically(teams.filter((item) => item.sport === sport && (!league || item.league === league)))[0];
}

const d = (family: string, id: string, name: string, year: number, width: number, height: number): Device => ({ family, id, name, year, width, height });

const deviceGroups = [
  { label: "사용자 지정", items: [d("Custom", "custom", "직접 해상도 입력", 2026, 1080, 2400)] },
  {
    label: "Apple · iPhone",
    items: [
      d("iPhone", "iphone-17-pro-max", "iPhone 17 Pro Max", 2025, 1320, 2868), d("iPhone", "iphone-17-pro", "iPhone 17 Pro", 2025, 1206, 2622), d("iPhone", "iphone-air", "iPhone Air", 2025, 1260, 2736), d("iPhone", "iphone-17", "iPhone 17", 2025, 1206, 2622),
      d("iPhone", "iphone-16-pro-max", "iPhone 16 Pro Max", 2024, 1320, 2868), d("iPhone", "iphone-16-pro", "iPhone 16 Pro", 2024, 1206, 2622), d("iPhone", "iphone-16-plus", "iPhone 16 Plus", 2024, 1290, 2796), d("iPhone", "iphone-16", "iPhone 16", 2024, 1179, 2556), d("iPhone", "iphone-16e", "iPhone 16e", 2025, 1170, 2532),
      d("iPhone", "iphone-15-pro-max", "iPhone 15 Pro Max", 2023, 1290, 2796), d("iPhone", "iphone-15-pro", "iPhone 15 Pro", 2023, 1179, 2556), d("iPhone", "iphone-15-plus", "iPhone 15 Plus", 2023, 1290, 2796), d("iPhone", "iphone-15", "iPhone 15", 2023, 1179, 2556),
      d("iPhone", "iphone-14-pro-max", "iPhone 14 Pro Max", 2022, 1290, 2796), d("iPhone", "iphone-14-pro", "iPhone 14 Pro", 2022, 1179, 2556), d("iPhone", "iphone-14-plus", "iPhone 14 Plus", 2022, 1284, 2778), d("iPhone", "iphone-14", "iPhone 14", 2022, 1170, 2532),
      d("iPhone", "iphone-13-pro-max", "iPhone 13 Pro Max", 2021, 1284, 2778), d("iPhone", "iphone-13-pro", "iPhone 13 Pro", 2021, 1170, 2532), d("iPhone", "iphone-13", "iPhone 13", 2021, 1170, 2532), d("iPhone", "iphone-13-mini", "iPhone 13 mini", 2021, 1080, 2340),
      d("iPhone", "iphone-12-pro-max", "iPhone 12 Pro Max", 2020, 1284, 2778), d("iPhone", "iphone-12-pro", "iPhone 12 Pro", 2020, 1170, 2532), d("iPhone", "iphone-12", "iPhone 12", 2020, 1170, 2532), d("iPhone", "iphone-12-mini", "iPhone 12 mini", 2020, 1080, 2340),
      d("iPhone", "iphone-11-pro-max", "iPhone 11 Pro Max", 2019, 1242, 2688), d("iPhone", "iphone-11-pro", "iPhone 11 Pro", 2019, 1125, 2436), d("iPhone", "iphone-11", "iPhone 11", 2019, 828, 1792),
      d("iPhone", "iphone-xs-max", "iPhone XS Max", 2018, 1242, 2688), d("iPhone", "iphone-xs", "iPhone XS", 2018, 1125, 2436), d("iPhone", "iphone-xr", "iPhone XR", 2018, 828, 1792), d("iPhone", "iphone-x", "iPhone X", 2017, 1125, 2436),
      d("iPhone", "iphone-8-plus", "iPhone 8 Plus", 2017, 1080, 1920), d("iPhone", "iphone-8", "iPhone 8", 2017, 750, 1334), d("iPhone", "iphone-7-plus", "iPhone 7 Plus", 2016, 1080, 1920), d("iPhone", "iphone-7", "iPhone 7", 2016, 750, 1334),
      d("iPhone", "iphone-se-3", "iPhone SE (3세대)", 2022, 750, 1334), d("iPhone", "iphone-se-2", "iPhone SE (2세대)", 2020, 750, 1334), d("iPhone", "iphone-se-1", "iPhone SE (1세대)", 2016, 640, 1136),
      d("iPhone", "iphone-6s-plus", "iPhone 6s Plus", 2015, 1080, 1920), d("iPhone", "iphone-6s", "iPhone 6s", 2015, 750, 1334), d("iPhone", "iphone-6-plus", "iPhone 6 Plus", 2014, 1080, 1920), d("iPhone", "iphone-6", "iPhone 6", 2014, 750, 1334),
      d("iPhone", "iphone-5s", "iPhone 5s", 2013, 640, 1136), d("iPhone", "iphone-5c", "iPhone 5c", 2013, 640, 1136), d("iPhone", "iphone-5", "iPhone 5", 2012, 640, 1136), d("iPhone", "iphone-4s", "iPhone 4s", 2011, 640, 960),
    ],
  },
  {
    label: "Apple · iPad",
    items: [
      d("iPad", "ipad-pro-13-m5", "iPad Pro 13\" (M5)", 2025, 2064, 2752), d("iPad", "ipad-pro-11-m5", "iPad Pro 11\" (M5)", 2025, 1668, 2420), d("iPad", "ipad-pro-13-m4", "iPad Pro 13\" (M4)", 2024, 2064, 2752), d("iPad", "ipad-pro-11-m4", "iPad Pro 11\" (M4)", 2024, 1668, 2420),
      d("iPad", "ipad-pro-129-6", "iPad Pro 12.9\" (6세대)", 2022, 2048, 2732), d("iPad", "ipad-pro-11-4", "iPad Pro 11\" (4세대)", 2022, 1668, 2388), d("iPad", "ipad-pro-129-5", "iPad Pro 12.9\" (5세대)", 2021, 2048, 2732), d("iPad", "ipad-pro-11-3", "iPad Pro 11\" (3세대)", 2021, 1668, 2388),
      d("iPad", "ipad-pro-129-4", "iPad Pro 12.9\" (4세대)", 2020, 2048, 2732), d("iPad", "ipad-pro-11-2", "iPad Pro 11\" (2세대)", 2020, 1668, 2388), d("iPad", "ipad-pro-129-3", "iPad Pro 12.9\" (3세대)", 2018, 2048, 2732), d("iPad", "ipad-pro-11-1", "iPad Pro 11\" (1세대)", 2018, 1668, 2388), d("iPad", "ipad-pro-105", "iPad Pro 10.5\"", 2017, 1668, 2224), d("iPad", "ipad-pro-97", "iPad Pro 9.7\"", 2016, 1536, 2048), d("iPad", "ipad-pro-129-1", "iPad Pro 12.9\" (1·2세대)", 2015, 2048, 2732),
      d("iPad", "ipad-air-13-m3", "iPad Air 13\" (M3)", 2025, 2048, 2732), d("iPad", "ipad-air-11-m3", "iPad Air 11\" (M3)", 2025, 1640, 2360), d("iPad", "ipad-air-13-m2", "iPad Air 13\" (M2)", 2024, 2048, 2732), d("iPad", "ipad-air-11-m2", "iPad Air 11\" (M2)", 2024, 1640, 2360), d("iPad", "ipad-air-5", "iPad Air (5세대)", 2022, 1640, 2360), d("iPad", "ipad-air-4", "iPad Air (4세대)", 2020, 1640, 2360), d("iPad", "ipad-air-3", "iPad Air (3세대)", 2019, 1668, 2224), d("iPad", "ipad-air-2", "iPad Air 2", 2014, 1536, 2048), d("iPad", "ipad-air-1", "iPad Air", 2013, 1536, 2048),
      d("iPad", "ipad-a16", "iPad (A16)", 2025, 1640, 2360), d("iPad", "ipad-10", "iPad (10세대)", 2022, 1640, 2360), d("iPad", "ipad-9", "iPad (9세대)", 2021, 1620, 2160), d("iPad", "ipad-8", "iPad (8세대)", 2020, 1620, 2160), d("iPad", "ipad-7", "iPad (7세대)", 2019, 1620, 2160), d("iPad", "ipad-6", "iPad (6세대)", 2018, 1536, 2048), d("iPad", "ipad-5", "iPad (5세대)", 2017, 1536, 2048), d("iPad", "ipad-4", "iPad (4세대)", 2012, 1536, 2048), d("iPad", "ipad-3", "iPad (3세대)", 2012, 1536, 2048), d("iPad", "ipad-2", "iPad 2", 2011, 768, 1024),
      d("iPad", "ipad-mini-7", "iPad mini (A17 Pro)", 2024, 1488, 2266), d("iPad", "ipad-mini-6", "iPad mini (6세대)", 2021, 1488, 2266), d("iPad", "ipad-mini-5", "iPad mini (5세대)", 2019, 1536, 2048), d("iPad", "ipad-mini-4", "iPad mini 4", 2015, 1536, 2048), d("iPad", "ipad-mini-2-3", "iPad mini 2·3", 2013, 1536, 2048), d("iPad", "ipad-mini-1", "iPad mini", 2012, 768, 1024),
    ],
  },
  {
    label: "Samsung · Galaxy 스마트폰",
    items: [
      d("Galaxy", "galaxy-s26-ultra", "Galaxy S26 Ultra", 2026, 1440, 3120), d("Galaxy", "galaxy-s26-plus", "Galaxy S26+", 2026, 1440, 3120), d("Galaxy", "galaxy-s26", "Galaxy S26", 2026, 1080, 2340),
      d("Galaxy", "galaxy-s25-ultra", "Galaxy S25 Ultra", 2025, 1440, 3120), d("Galaxy", "galaxy-s25-plus", "Galaxy S25+", 2025, 1440, 3120), d("Galaxy", "galaxy-s25", "Galaxy S25", 2025, 1080, 2340), d("Galaxy", "galaxy-s25-edge", "Galaxy S25 Edge", 2025, 1440, 3120), d("Galaxy", "galaxy-s25-fe", "Galaxy S25 FE", 2025, 1080, 2340),
      d("Galaxy", "galaxy-s24-ultra", "Galaxy S24 Ultra", 2024, 1440, 3120), d("Galaxy", "galaxy-s24-plus", "Galaxy S24+", 2024, 1440, 3120), d("Galaxy", "galaxy-s24", "Galaxy S24", 2024, 1080, 2340), d("Galaxy", "galaxy-s24-fe", "Galaxy S24 FE", 2024, 1080, 2340),
      d("Galaxy", "galaxy-s23-ultra", "Galaxy S23 Ultra", 2023, 1440, 3088), d("Galaxy", "galaxy-s23-plus", "Galaxy S23+", 2023, 1080, 2340), d("Galaxy", "galaxy-s23", "Galaxy S23", 2023, 1080, 2340), d("Galaxy", "galaxy-s23-fe", "Galaxy S23 FE", 2023, 1080, 2340),
      d("Galaxy", "galaxy-s22-ultra", "Galaxy S22 Ultra", 2022, 1440, 3088), d("Galaxy", "galaxy-s22-plus", "Galaxy S22+", 2022, 1080, 2340), d("Galaxy", "galaxy-s22", "Galaxy S22", 2022, 1080, 2340),
      d("Galaxy", "galaxy-s21-ultra", "Galaxy S21 Ultra", 2021, 1440, 3200), d("Galaxy", "galaxy-s21-plus", "Galaxy S21+", 2021, 1080, 2400), d("Galaxy", "galaxy-s21", "Galaxy S21", 2021, 1080, 2400), d("Galaxy", "galaxy-s21-fe", "Galaxy S21 FE", 2022, 1080, 2400),
      d("Galaxy", "galaxy-s20-ultra", "Galaxy S20 Ultra", 2020, 1440, 3200), d("Galaxy", "galaxy-s20-plus", "Galaxy S20+", 2020, 1440, 3200), d("Galaxy", "galaxy-s20", "Galaxy S20", 2020, 1440, 3200), d("Galaxy", "galaxy-s20-fe", "Galaxy S20 FE", 2020, 1080, 2400),
      d("Galaxy", "galaxy-s10-plus", "Galaxy S10+", 2019, 1440, 3040), d("Galaxy", "galaxy-s10", "Galaxy S10", 2019, 1440, 3040), d("Galaxy", "galaxy-s10e", "Galaxy S10e", 2019, 1080, 2280), d("Galaxy", "galaxy-s9-plus", "Galaxy S9+", 2018, 1440, 2960), d("Galaxy", "galaxy-s9", "Galaxy S9", 2018, 1440, 2960), d("Galaxy", "galaxy-s8-plus", "Galaxy S8+", 2017, 1440, 2960), d("Galaxy", "galaxy-s8", "Galaxy S8", 2017, 1440, 2960),
      d("Galaxy", "galaxy-s7-edge", "Galaxy S7 edge", 2016, 1440, 2560), d("Galaxy", "galaxy-s7", "Galaxy S7", 2016, 1440, 2560), d("Galaxy", "galaxy-s6-edge-plus", "Galaxy S6 edge+", 2015, 1440, 2560), d("Galaxy", "galaxy-s6", "Galaxy S6", 2015, 1440, 2560), d("Galaxy", "galaxy-s5", "Galaxy S5", 2014, 1080, 1920), d("Galaxy", "galaxy-s4", "Galaxy S4", 2013, 1080, 1920), d("Galaxy", "galaxy-s3", "Galaxy S III", 2012, 720, 1280), d("Galaxy", "galaxy-s2", "Galaxy S II", 2011, 480, 800),
      d("Galaxy", "galaxy-note20-ultra", "Galaxy Note20 Ultra", 2020, 1440, 3088), d("Galaxy", "galaxy-note20", "Galaxy Note20", 2020, 1080, 2400), d("Galaxy", "galaxy-note10-plus", "Galaxy Note10+", 2019, 1440, 3040), d("Galaxy", "galaxy-note10", "Galaxy Note10", 2019, 1080, 2280), d("Galaxy", "galaxy-note9", "Galaxy Note9", 2018, 1440, 2960), d("Galaxy", "galaxy-note8", "Galaxy Note8", 2017, 1440, 2960), d("Galaxy", "galaxy-note7", "Galaxy Note7", 2016, 1440, 2560), d("Galaxy", "galaxy-note5", "Galaxy Note5", 2015, 1440, 2560), d("Galaxy", "galaxy-note4", "Galaxy Note4", 2014, 1440, 2560), d("Galaxy", "galaxy-note3", "Galaxy Note3", 2013, 1080, 1920), d("Galaxy", "galaxy-note2", "Galaxy Note II", 2012, 720, 1280), d("Galaxy", "galaxy-note1", "Galaxy Note", 2011, 800, 1280),
      d("Galaxy", "galaxy-z-trifold", "Galaxy Z TriFold · 메인 화면", 2025, 1584, 2160), d("Galaxy", "galaxy-z-fold7", "Galaxy Z Fold7 · 메인 화면", 2025, 1968, 2184), d("Galaxy", "galaxy-z-flip7", "Galaxy Z Flip7 · 메인 화면", 2025, 1080, 2520), d("Galaxy", "galaxy-z-flip7-fe", "Galaxy Z Flip7 FE · 메인 화면", 2025, 1080, 2640), d("Galaxy", "galaxy-z-fold6", "Galaxy Z Fold6 · 메인 화면", 2024, 1856, 2160), d("Galaxy", "galaxy-z-flip6", "Galaxy Z Flip6 · 메인 화면", 2024, 1080, 2640), d("Galaxy", "galaxy-z-fold5", "Galaxy Z Fold5 · 메인 화면", 2023, 1812, 2176), d("Galaxy", "galaxy-z-flip5", "Galaxy Z Flip5 · 메인 화면", 2023, 1080, 2640), d("Galaxy", "galaxy-z-fold4", "Galaxy Z Fold4 · 메인 화면", 2022, 1812, 2176), d("Galaxy", "galaxy-z-flip4", "Galaxy Z Flip4 · 메인 화면", 2022, 1080, 2640), d("Galaxy", "galaxy-z-fold3", "Galaxy Z Fold3 · 메인 화면", 2021, 1768, 2208), d("Galaxy", "galaxy-z-flip3", "Galaxy Z Flip3 · 메인 화면", 2021, 1080, 2640), d("Galaxy", "galaxy-z-fold2", "Galaxy Z Fold2 · 메인 화면", 2020, 1768, 2208), d("Galaxy", "galaxy-fold", "Galaxy Fold · 메인 화면", 2019, 1536, 2152),
    ],
  },
  {
    label: "Samsung · Galaxy Tab",
    items: [
      d("Galaxy Tab", "tab-s11-ultra", "Galaxy Tab S11 Ultra", 2025, 1848, 2960), d("Galaxy Tab", "tab-s11", "Galaxy Tab S11", 2025, 1600, 2560), d("Galaxy Tab", "tab-s10-ultra", "Galaxy Tab S10 Ultra", 2024, 1848, 2960), d("Galaxy Tab", "tab-s10-plus", "Galaxy Tab S10+", 2024, 1752, 2800),
      d("Galaxy Tab", "tab-s9-ultra", "Galaxy Tab S9 Ultra", 2023, 1848, 2960), d("Galaxy Tab", "tab-s9-plus", "Galaxy Tab S9+", 2023, 1752, 2800), d("Galaxy Tab", "tab-s9", "Galaxy Tab S9", 2023, 1600, 2560), d("Galaxy Tab", "tab-s9-fe-plus", "Galaxy Tab S9 FE+", 2023, 1600, 2560), d("Galaxy Tab", "tab-s9-fe", "Galaxy Tab S9 FE", 2023, 1440, 2304),
      d("Galaxy Tab", "tab-s8-ultra", "Galaxy Tab S8 Ultra", 2022, 1848, 2960), d("Galaxy Tab", "tab-s8-plus", "Galaxy Tab S8+", 2022, 1752, 2800), d("Galaxy Tab", "tab-s8", "Galaxy Tab S8", 2022, 1600, 2560), d("Galaxy Tab", "tab-s7-plus", "Galaxy Tab S7+", 2020, 1752, 2800), d("Galaxy Tab", "tab-s7", "Galaxy Tab S7", 2020, 1600, 2560),
      d("Galaxy Tab", "tab-s6", "Galaxy Tab S6", 2019, 1600, 2560), d("Galaxy Tab", "tab-s5e", "Galaxy Tab S5e", 2019, 1600, 2560), d("Galaxy Tab", "tab-s4", "Galaxy Tab S4", 2018, 1600, 2560), d("Galaxy Tab", "tab-s3", "Galaxy Tab S3", 2017, 1536, 2048), d("Galaxy Tab", "tab-s2-97", "Galaxy Tab S2 9.7\"", 2015, 1536, 2048), d("Galaxy Tab", "tab-s-105", "Galaxy Tab S 10.5\"", 2014, 1600, 2560), d("Galaxy Tab", "galaxy-tab-101", "Galaxy Tab 10.1", 2011, 800, 1280),
    ],
  },
];

const devices = deviceGroups.flatMap((group) => group.items);

const sundayFirstWeekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const mondayFirstWeekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
type SportTab = "baseball" | "football" | "volleyball" | "basketball";

const sportOptions: { id: SportTab; label: string }[] = [
  { id: "baseball", label: "야구" }, { id: "football", label: "축구" }, { id: "volleyball", label: "배구" }, { id: "basketball", label: "농구" },
];

function primarySport(sport: Team["sport"]): SportTab {
  if (sport === "kbaseball") return "baseball";
  if (sport === "kfootball" || sport === "wfootball") return "football";
  return sport;
}

const koreanTeamNames: Record<string, string> = {
  "kbo-lg": "LG 트윈스", "kbo-kia": "KIA 타이거즈", "kbo-hanwha": "한화 이글스", "kbo-samsung": "삼성 라이온즈", "kbo-lotte": "롯데 자이언츠",
  "kbo-doosan": "두산 베어스", "kbo-ssg": "SSG 랜더스", "kbo-nc": "NC 다이노스", "kbo-kt": "KT 위즈", "kbo-kiwoom": "키움 히어로즈",
  "kleague-ulsan": "울산 HD", "kleague-seoul": "FC 서울", "kleague-jeonbuk": "전북 현대", "kleague-pohang": "포항 스틸러스", "kleague-daejeon": "대전 하나 시티즌",
  "epl-mancity": "맨체스터 시티", "epl-manunited": "맨체스터 유나이티드", "epl-tottenham": "토트넘 홋스퍼",
  "kovo-koreanair": "대한항공 점보스", "kovo-hyundai": "현대캐피탈 스카이워커스", "wkovo-heungkuk": "흥국생명 핑크스파이더스",
};

function koreanTeamName(team: Team) {
  return koreanTeamNames[team.id] ?? team.scheduleName;
}

function monthCells(month: string, weekStart: "sunday" | "monday") {
  const [year, monthNumber] = month.split("-").map(Number);
  const firstWeekday = new Date(year, monthNumber - 1, 1).getDay();
  const start = weekStart === "monday" ? (firstWeekday + 6) % 7 : firstWeekday;
  const days = new Date(year, monthNumber, 0).getDate();
  return Array.from({ length: 42 }, (_, index) => {
    const day = index - start + 1;
    return day > 0 && day <= days ? day : null;
  });
}

function hexToRgba(hex: string, opacity: number) {
  const value = hex.replace("#", "");
  const number = Number.parseInt(value, 16);
  return `rgba(${(number >> 16) & 255},${(number >> 8) & 255},${number & 255},${opacity})`;
}

function isLightColor(hex: string) {
  const value = Number.parseInt(hex.replace("#", ""), 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  return red * 0.299 + green * 0.587 + blue * 0.114 > 165;
}

const teamMascotSymbols: Record<string, string> = {
  "kbo-lotte": "🐦",
  "kleague-ulsan": "🐯", "kleague-seoul": "🦅", "kleague-jeonbuk": "🦁", "kleague-pohang": "⚙️", "kleague-daejeon": "🟣", "kleague-gangwon": "🐻", "kleague-gwangju": "🦌", "kleague-jeju": "🦌", "kleague-gimcheon": "🦅", "kleague-incheon": "🦅", "kleague-anyang": "🦄", "kleague-bucheon": "🦊",
  "epl-arsenal": "💥", "epl-liverpool": "🐦", "epl-mancity": "🐆", "epl-manunited": "👹", "epl-tottenham": "🐦", "epl-chelsea": "🦁", "laliga-real": "👑", "laliga-barca": "🐲", "laliga-atleti": "🐻", "bundes-bayern": "🐻", "bundes-dortmund": "🐝", "serie-inter": "🐍", "serie-milan": "🐦", "ligue1-psg": "🦁",
  "kovo-koreanair": "🐘", "kovo-hyundai": "🦁", "kovo-kepco": "⚡", "kovo-wooricard": "🐝", "kovo-ok": "🙂", "kovo-kb": "⭐", "kovo-samsung": "🐺", "wkovo-heungkuk": "🕷️", "wkovo-hillstate": "🏗️", "wkovo-gs": "👟", "wkovo-ibk": "🦅", "wkovo-koreaexpress": "🛣️", "wkovo-kgc": "🔥", "wkovo-peppers": "🌶️",
  "kbl-sk": "🛡️", "kbl-lg": "🐯", "kbl-kt": "⚡", "kbl-kcc": "🛡️", "kbl-db": "🦌", "kbl-mob": "🐦", "kbl-samsung": "⚡", "kbl-gas": "🐴", "kbl-kgc": "🐂", "kbl-sono": "🦅", "nba-lakers": "👑", "nba-warriors": "⚔️", "nba-boston": "☘️", "nba-knicks": "🏙️", "nba-bulls": "🐂", "nba-miami": "🔥",
};

function mascotSymbol(team: Team) {
  if (teamMascotSymbols[team.id]) return teamMascotSymbols[team.id];
  const mascot = team.mascot;
  if (/호랑/.test(mascot)) return "🐯";
  if (/독수리|이글/.test(mascot)) return "🦅";
  if (/사자/.test(mascot)) return "🦁";
  if (/곰/.test(mascot)) return "🐻";
  if (/공룡/.test(mascot)) return "🦖";
  if (/말|페가수스/.test(mascot)) return "🐴";
  if (/거인/.test(mascot)) return "🗿";
  if (/마법/.test(mascot)) return "🧙";
  if (/거너|대포/.test(mascot)) return "💥";
  if (/쌍둥/.test(mascot)) return "👯";
  if (/랜디/.test(mascot)) return "🐶";
  if (/영웅/.test(mascot)) return "🦸";
  if (team.sport === "kbaseball") return "⚾";
  if (team.sport === "kfootball" || team.sport === "wfootball") return "⚽";
  if (team.sport === "volleyball") return "🏐";
  return "🏀";
}

function mascotBadgeTone(team: Team, symbol = mascotSymbol(team)) {
  const tones: Record<string, string> = {
    "🐯": "#fff0dc", "🦅": "#eaf2fb", "🦁": "#fff2d8", "🐻": "#f7ebe1",
    "🦖": "#e7f5eb", "🐴": "#f9ede4", "🐦": "#e8eff9", "🗿": "#edf0f4", "🧙": "#eee9fb",
    "💥": "#fff0df", "👯": "#f8eafa", "🐶": "#f8eddc", "🦸": "#eaf0ff",
    "⚾": "#f4edf0", "⚽": "#eef1f4", "🏐": "#fff2df", "🏀": "#fff0df",
  };
  return tones[symbol] ?? "#eef2f6";
}

function opponentMascotSymbol(opponent: string, selectedTeam: Team, emojiOverrides: Record<string, string> = {}) {
  const key = (value: string) => value.toLowerCase().replace(/\b(fc|afc)\b/g, "").replace(/\s|[().·-]/g, "");
  const opponentKey = key(opponent);
  const opponentTeam = teams.find((item) => {
    if (item.category !== selectedTeam.category) return false;
    const scheduleKey = key(item.scheduleName);
    return scheduleKey === opponentKey || scheduleKey.includes(opponentKey) || opponentKey.includes(scheduleKey);
  });
  if (opponentTeam) return emojiOverrides[opponentTeam.id]?.trim() || mascotSymbol(opponentTeam);
  if (selectedTeam.sport === "kbaseball") return "⚾";
  if (selectedTeam.sport === "kfootball" || selectedTeam.sport === "wfootball") return "⚽";
  if (selectedTeam.sport === "volleyball") return "🏐";
  return "🏀";
}

function formatSyncedDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "최신 일정 동기화 완료";

  const parts = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).formatToParts(date);
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? "";

  return `${part("year")}년 ${part("month")}월 ${part("day")}일 (${part("weekday")}) 동기화`;
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const calendarDragRef = useRef<{ x: number; y: number; scale: number; ratio: number } | null>(null);
  const downloadNoticeTimerRef = useRef<number | null>(null);
  const [sport, setSport] = useState<Team["sport"]>("kbaseball");
  const [league, setLeague] = useState("KBO");
  const [teamId, setTeamId] = useState(() => firstTeamFor("kbaseball", "KBO")?.id ?? teams[0].id);
  const [deviceId, setDeviceId] = useState("iphone-17-pro");
  const [showDeviceMenu, setShowDeviceMenu] = useState(false);
  const [customWidth, setCustomWidth] = useState(1080);
  const [customHeight, setCustomHeight] = useState(2400);
  const [month, setMonth] = useState("2026-07");
  const [monthText, setMonthText] = useState("2026-07");
  const [weekStart, setWeekStart] = useState<"sunday" | "monday">("sunday");
  const [backgroundMode, setBackgroundMode] = useState<"team" | "midnight" | "forest" | "sunset" | "ivory" | "color" | "photo">("team");
  const [backgroundColor, setBackgroundColor] = useState("#203A62");
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);
  const [backgroundImageName, setBackgroundImageName] = useState("");
  const [calendarColor, setCalendarColor] = useState("#071327");
  const [calendarOpacity, setCalendarOpacity] = useState(66);
  const [calendarTextScale, setCalendarTextScale] = useState(100);
  const [calendarScale, setCalendarScale] = useState(1);
  const [calendarRatio, setCalendarRatio] = useState(1);
  const [calendarResizeMode, setCalendarResizeMode] = useState<"locked" | "free">("locked");
  const [exportQuality, setExportQuality] = useState<"native" | "double">("native");
  const [previewMode, setPreviewMode] = useState<"lock" | "home">("lock");
  const [showSafeAreaGuide, setShowSafeAreaGuide] = useState(true);
  const [showLockClock, setShowLockClock] = useState(true);
  const [showLockWidgets, setShowLockWidgets] = useState(true);
  const [homeGameColor, setHomeGameColor] = useState("#FFFFFF");
  const [awayGameColor, setAwayGameColor] = useState("#738095");
  const [eventDisplayMode, setEventDisplayMode] = useState<"text" | "mascot" | "emoji" | "photo">("text");
  const [showGameTime, setShowGameTime] = useState(true);
  const [homeEventEmoji, setHomeEventEmoji] = useState("🏠");
  const [awayEventEmoji, setAwayEventEmoji] = useState("🚌");
  const [clubEmojiOverrides, setClubEmojiOverrides] = useState<Record<string, string>>({});
  const [eventImage, setEventImage] = useState<HTMLImageElement | null>(null);
  const [eventImageName, setEventImageName] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const [syncState, setSyncState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [syncedAt, setSyncedAt] = useState("");
  const [newOpponent, setNewOpponent] = useState("");
  const [newDate, setNewDate] = useState("2026-07-10");
  const [newTime, setNewTime] = useState("18:30");
  const [showDesign, setShowDesign] = useState(true);
  const [deviceQuery, setDeviceQuery] = useState("");
  const [recentDeviceIds, setRecentDeviceIds] = useState<string[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ headline: string; summary: string; tags: string[] } | null>(null);
  const [lastSaveHeadlineIndex, setLastSaveHeadlineIndex] = useState(-1);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(preferenceStorageKey);
      if (!saved) return;
      const preferences = JSON.parse(saved) as { teamId?: string; deviceId?: string; customWidth?: number; customHeight?: number };
      const savedTeam = teams.find((item) => item.id === preferences.teamId);
      if (savedTeam) {
        setTeamId(savedTeam.id);
        setSport(savedTeam.sport);
        setLeague(savedTeam.league);
      }
      if (preferences.deviceId && (preferences.deviceId === "custom" || devices.some((item) => item.id === preferences.deviceId))) setDeviceId(preferences.deviceId);
      if (Number.isFinite(preferences.customWidth) && preferences.customWidth! >= 320 && preferences.customWidth! <= 5000) setCustomWidth(preferences.customWidth!);
      if (Number.isFinite(preferences.customHeight) && preferences.customHeight! >= 480 && preferences.customHeight! <= 6000) setCustomHeight(preferences.customHeight!);
    } catch {
      // Ignore invalid local preferences and keep the useful defaults.
    } finally {
      setPreferencesLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!preferencesLoaded) return;
    window.localStorage.setItem(preferenceStorageKey, JSON.stringify({ teamId, deviceId, customWidth, customHeight }));
  }, [preferencesLoaded, teamId, deviceId, customWidth, customHeight]);

  useEffect(() => () => {
    if (downloadNoticeTimerRef.current) window.clearTimeout(downloadNoticeTimerRef.current);
  }, []);

  const team = teams.find((item) => item.id === teamId) ?? teams[0];
  const selectedClubEmoji = clubEmojiOverrides[team.id]?.trim() || mascotSymbol(team);
  const deviceResults = useMemo(() => {
    const query = deviceQuery.trim().toLowerCase();
    return deviceGroups.map((group) => ({
      ...group,
      items: group.items.filter((item) => !query || `${item.name} ${item.family} ${item.year}`.toLowerCase().includes(query)),
    })).filter((group) => group.items.length > 0);
  }, [deviceQuery]);
  const recentDevices = useMemo(() => recentDeviceIds.map((id) => devices.find((item) => item.id === id)).filter(Boolean) as Device[], [recentDeviceIds]);
  const leagues = useMemo(() => Array.from(new Set(teams.filter((item) => item.sport === sport).map((item) => item.league))), [sport]);
  const visibleTeams = useMemo(
    () => sortTeamsAlphabetically(teams.filter((item) => item.sport === sport && item.league === league)),
    [sport, league],
  );
  const selectedDevice = devices.find((item) => item.id === deviceId) ?? devices[0];
  const device = deviceId === "custom" ? { ...selectedDevice, width: customWidth, height: customHeight } : selectedDevice;
  const canExportDouble = device.width * device.height <= 6_000_000;
  const renderScale = exportQuality === "double" && canExportDouble ? 2 : 1;
  const deviceClass = device.width / device.height > 0.68 ? "tablet" : "phone";
  const previewPlatform = /iPhone|iPad/.test(device.family) ? "ios" : "android";
  const isClassicIphone = /iphone-(?:4|5|6|7|8|se)/i.test(device.id);
  const hasDynamicIsland = /iphone-(?:14-pro|15|16|17|air)/i.test(device.id);
  const safeGuideKind = deviceClass === "tablet" ? "tablet" : previewPlatform === "android" ? "android" : hasDynamicIsland ? "dynamic-island" : isClassicIphone ? "classic" : "notch";
  const safeGuideTopLabel = safeGuideKind === "dynamic-island" ? "다이내믹 아일랜드 · 시계 · 위젯" : safeGuideKind === "notch" ? "노치 · 시계 · 위젯" : safeGuideKind === "classic" ? "상단 상태바 · 시계 · 위젯" : safeGuideKind === "android" ? "펀치홀 · 상태바 · 시계 · 위젯" : "상단 상태바 · 시계 · 위젯";
  const safeGuideBottomLabel = previewPlatform === "android" ? "내비게이션 · 제스처 영역" : deviceClass === "tablet" ? "Dock · 제스처 영역" : "빠른 실행 · 홈 제스처 영역";
  const previewLayout = (() => {
    const isTablet = device.width / device.height > 0.68;
    const isFoldable = /fold|flip|trifold/i.test(device.id);
    const isGalaxy = /Galaxy/.test(device.family);
    return {
      "--lock-clock-top": isTablet ? "7%" : isFoldable ? "8%" : isGalaxy ? "10%" : hasDynamicIsland ? "10.2%" : isClassicIphone ? "8.8%" : "8.6%",
      "--lock-widgets-top": isTablet ? "22%" : isFoldable ? "24%" : isGalaxy ? "28%" : "27%",
      "--dock-bottom": isTablet ? "4%" : isFoldable ? "3.5%" : isGalaxy ? "3%" : "4%",
      "--dock-side": isTablet ? "11%" : isFoldable ? "7%" : "5%",
      "--safe-top": isTablet ? "5.5%" : isClassicIphone ? "4%" : isFoldable ? "5%" : isGalaxy ? "4%" : "5%",
      "--safe-top-height": isTablet ? "23%" : isClassicIphone ? "29%" : isFoldable ? "27%" : isGalaxy ? "30%" : "29%",
      "--safe-bottom": isTablet ? "3%" : isClassicIphone ? "3%" : isFoldable ? "3%" : isGalaxy ? "2%" : "3%",
      "--safe-bottom-height": isTablet ? "10%" : isClassicIphone ? "10%" : isFoldable ? "11%" : isGalaxy ? "9%" : "11%",
      "--sensor-top": isTablet ? ".8%" : isClassicIphone ? "-10%" : isFoldable ? "1.4%" : isGalaxy ? "1.15%" : hasDynamicIsland ? "1.1%" : "0%",
      "--status-top": isTablet ? "2.2%" : isClassicIphone ? "2.1%" : hasDynamicIsland ? "2.35%" : "2.2%",
    } as React.CSSProperties;
  })();
  const cells = useMemo(() => monthCells(month, weekStart), [month, weekStart]);
  const displayWeekdays = weekStart === "monday" ? mondayFirstWeekdays : sundayFirstWeekdays;
  const densityTip = games.length >= 18
    ? "경기가 많은 달이에요. 상대팀 이모지 표시와 시간 숨김을 추천합니다."
    : games.length >= 12
      ? "경기가 많은 편이에요. 달력을 크게 하거나 시간 표시를 끄면 더 잘 읽혀요."
      : "일정이 잘 읽히는 밀도예요. 원하는 방식으로 꾸며보세요.";
  const [year, monthNumber] = month.split("-").map(Number);
  const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(year, monthNumber - 1, 1)).toUpperCase();

  async function syncSchedule() {
    setSyncState("loading");
    try {
      const query = new URLSearchParams({ sport: team.sport, category: team.category, team: team.scheduleName, month });
      const response = await fetch(`/api/schedule?${query}`);
      if (!response.ok) throw new Error("schedule sync failed");
      const data = await response.json() as { games: Game[]; syncedAt: string };
      setGames(data.games);
      setSyncedAt(data.syncedAt);
      setSyncState("success");
    } catch {
      setGames([]);
      setSyncState("error");
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => { void syncSchedule(); }, 250);
    return () => window.clearTimeout(timer);
    // syncSchedule is intentionally driven only by the selected team and month.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId, month]);

  useEffect(() => {
    setHomeGameColor("#FFFFFF");
    setAwayGameColor("#738095");
  }, [teamId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = device.width * renderScale;
    canvas.height = device.height * renderScale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = device.width * renderScale;
    const H = device.height * renderScale;
    const landscape = W > H;
    const unit = Math.min(W, H);
    const pad = unit * 0.075;
    const gridTop = landscape ? H * 0.27 : H * 0.36;
    const gridHeight = landscape ? H * 0.60 : H * 0.48;
    const cellW = (W - pad * 2) / 7;
    const cellH = gridHeight / 6;
    const calendarTextUnit = unit * (calendarTextScale / 100);

    const themeColors: Record<string, [string, string]> = {
      team: [team.primary, "#071327"], midnight: ["#142947", "#050B15"], forest: ["#245B49", "#071A16"], sunset: ["#9D4773", "#F28A5B"], ivory: ["#EEE8DA", "#BDAE91"], color: [backgroundColor, "#071327"],
    };
    if (backgroundMode === "photo" && backgroundImage) {
      const scale = Math.max(W / backgroundImage.width, H / backgroundImage.height);
      const imageW = backgroundImage.width * scale;
      const imageH = backgroundImage.height * scale;
      ctx.drawImage(backgroundImage, (W - imageW) / 2, (H - imageH) / 2, imageW, imageH);
      ctx.fillStyle = "rgba(3,9,18,.28)";
      ctx.fillRect(0, 0, W, H);
    } else {
      const [startColor, endColor] = themeColors[backgroundMode] ?? themeColors.team;
      const gradient = ctx.createLinearGradient(0, 0, W, H);
      gradient.addColorStop(0, startColor);
      gradient.addColorStop(1, endColor);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);
    }

    const lightCalendar = isLightColor(calendarColor) && calendarOpacity >= 55;
    const calendarForeground = lightCalendar ? "#0A1425" : "#FFFFFF";
    const calendarMuted = lightCalendar ? "rgba(10,20,37,.68)" : "rgba(255,255,255,.72)";

    ctx.save();
    ctx.translate(W / 2, gridTop + gridHeight / 2);
    ctx.scale(calendarScale, calendarScale * calendarRatio);
    ctx.translate(-W / 2, -(gridTop + gridHeight / 2));

    ctx.fillStyle = hexToRgba(calendarColor, calendarOpacity / 100);
    ctx.beginPath();
    ctx.roundRect(pad, gridTop - unit * 0.14, W - pad * 2, gridHeight + unit * 0.20, unit * 0.025);
    ctx.fill();

    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.fillStyle = calendarForeground;
    ctx.font = `900 ${calendarTextUnit * 0.047}px Arial`;
    ctx.fillText(`${monthLabel} ${year}`, pad + unit * 0.035, gridTop - unit * 0.115);

    ctx.textAlign = "center";
    ctx.font = `800 ${calendarTextUnit * 0.022}px Arial`;
    displayWeekdays.forEach((day, index) => {
      ctx.fillStyle = day === "SUN" ? team.secondary : calendarMuted;
      ctx.fillText(day, pad + cellW * index + cellW / 2, gridTop - unit * 0.035);
    });

    cells.forEach((day, index) => {
      if (!day) return;
      const col = index % 7;
      const row = Math.floor(index / 7);
      const x = pad + col * cellW;
      const y = gridTop + row * cellH;
      const dateKey = `${month}-${String(day).padStart(2, "0")}`;
      const game = games.find((item) => item.date === dateKey);
      if (game) {
        const gameColor = game.home ? homeGameColor : awayGameColor;
        ctx.fillStyle = gameColor;
        ctx.beginPath();
        ctx.roundRect(x + cellW * 0.08, y + cellH * 0.08, cellW * 0.84, cellH * 0.82, unit * 0.015);
        ctx.fill();
      }
      ctx.textAlign = "left";
      const gameColor = game ? (game.home ? homeGameColor : awayGameColor) : "";
      ctx.fillStyle = game ? (isLightColor(gameColor) ? "#071327" : "#FFFFFF") : displayWeekdays[col] === "SUN" ? team.secondary : calendarForeground;
      ctx.font = `800 ${calendarTextUnit * 0.025}px Arial`;
      ctx.fillText(String(day).padStart(2, "0"), x + cellW * 0.16, y + cellH * 0.15);
      if (game) {
        if (eventDisplayMode === "text") {
          ctx.font = `900 ${calendarTextUnit * 0.019}px Arial`;
          ctx.fillText(`${game.home ? "vs" : "@"} ${game.opponent}`, x + cellW * 0.16, y + cellH * 0.48, cellW * 0.7);
          if (showGameTime) {
            ctx.font = `700 ${calendarTextUnit * 0.016}px Arial`;
            ctx.fillText(game.time, x + cellW * 0.16, y + cellH * 0.69);
          }
        } else if (eventDisplayMode === "photo" && eventImage) {
          const markerSize = Math.min(cellW * 0.40, cellH * 0.42);
          const markerX = x + cellW * 0.5;
          const markerY = y + cellH * 0.63;
          ctx.save();
          ctx.beginPath();
          ctx.arc(markerX, markerY, markerSize / 2, 0, Math.PI * 2);
          ctx.clip();
          const scale = Math.max(markerSize / eventImage.width, markerSize / eventImage.height);
          const imageW = eventImage.width * scale;
          const imageH = eventImage.height * scale;
          ctx.drawImage(eventImage, markerX - imageW / 2, markerY - imageH / 2, imageW, imageH);
          ctx.restore();
        } else {
          const marker = eventDisplayMode === "emoji"
            ? (game.home ? (homeEventEmoji.trim() || "🏠") : (awayEventEmoji.trim() || "🚌"))
            : opponentMascotSymbol(game.opponent, team, clubEmojiOverrides);
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = `${unit * 0.045}px "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
          ctx.fillText(marker, x + cellW * 0.5, y + cellH * 0.63);
          ctx.textBaseline = "top";
        }
      }
    });
    ctx.restore();

  }, [team, device, month, games, backgroundMode, backgroundColor, backgroundImage, calendarColor, calendarOpacity, calendarTextScale, calendarScale, calendarRatio, homeGameColor, awayGameColor, eventDisplayMode, showGameTime, homeEventEmoji, awayEventEmoji, clubEmojiOverrides, eventImage, cells, displayWeekdays, monthLabel, year, renderScale]);

  function handleBackgroundImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const image = new Image();
    image.onload = () => {
      setBackgroundImage(image);
      setBackgroundImageName(file.name);
      setBackgroundMode("photo");
    };
    image.src = URL.createObjectURL(file);
  }

  function handleEventImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const image = new Image();
    image.onload = () => {
      setEventImage(image);
      setEventImageName(file.name);
      setEventDisplayMode("photo");
    };
    image.src = URL.createObjectURL(file);
  }

  function addGame() {
    if (!newOpponent.trim() || !newDate) return;
    setGames((current) => [...current, { id: crypto.randomUUID(), date: newDate, opponent: newOpponent.trim().toUpperCase(), time: newTime, home: true }]);
    setNewOpponent("");
  }

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${team.name.toLowerCase()}-${month}-${device.id}${renderScale === 2 ? "-2x" : ""}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    setDownloadNotice(true);
    if (downloadNoticeTimerRef.current) window.clearTimeout(downloadNoticeTimerRef.current);

    const teamName = koreanTeamName(team);
    const teamTag = teamName.replace(/\s+/g, "");
    const sportLabel = sportOptions.find((item) => item.id === primarySport(team.sport))?.label ?? team.league;
    let headlineIndex = Math.floor(Math.random() * saveHeadlines.length);
    if (saveHeadlines.length > 1 && headlineIndex === lastSaveHeadlineIndex) headlineIndex = (headlineIndex + 1) % saveHeadlines.length;
    setLastSaveHeadlineIndex(headlineIndex);
    downloadNoticeTimerRef.current = window.setTimeout(() => {
      setDownloadNotice(false);
      setSaveMessage({
        headline: saveHeadlines[headlineIndex],
        summary: `${Number(month.split("-")[1])}월 ${teamName} 배경화면 완성🎉\n다음 경기도 잠금화면에서 한눈에 확인하세요.`,
        tags: [`#${teamTag}`, `#${sportLabel}`, "#Matchday"],
      });
    }, 850);
  }

  function updateMonth(value: string) {
    setMonthText(value);
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) return;
    setMonth(value);
    setNewDate(`${value}-10`);
  }

  function selectSport(nextSport: Team["sport"]) {
    const firstTeam = firstTeamFor(nextSport);
    if (!firstTeam) return;
    setSport(nextSport);
    setLeague(firstTeam.league);
    setTeamId(firstTeam.id);
  }

  function selectSportTab(nextTab: SportTab) {
    const nextSport: Team["sport"] = nextTab === "baseball" ? "kbaseball" : nextTab === "football" ? (sport === "wfootball" ? "wfootball" : "kfootball") : nextTab;
    selectSport(nextSport);
  }

  function selectLeague(nextLeague: string) {
    const firstTeam = firstTeamFor(sport, nextLeague);
    setLeague(nextLeague);
    if (firstTeam) setTeamId(firstTeam.id);
  }

  function startCalendarResize(event: PointerEvent<HTMLButtonElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    calendarDragRef.current = { x: event.clientX, y: event.clientY, scale: calendarScale, ratio: calendarRatio };
  }

  function resizeCalendar(event: PointerEvent<HTMLButtonElement>) {
    const drag = calendarDragRef.current;
    if (!drag) return;
    setCalendarScale(Math.min(1.22, Math.max(0.72, drag.scale + (event.clientX - drag.x) / 360)));
    if (calendarResizeMode === "free") setCalendarRatio(Math.min(1.3, Math.max(0.72, drag.ratio + (event.clientY - drag.y) / 320)));
  }

  function stopCalendarResize() {
    calendarDragRef.current = null;
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Matchday 홈"><span className="brand-mark"><img src="/favicon.png" alt="" /></span><span>MATCHDAY</span></a>
        <div className="offline-pill"><span /> LOCAL · NO API KEY</div>
      </header>

      <section className="workspace" id="top">
        <aside className="controls">
          <div className="intro">
            <p className="eyebrow"><span className="hero-brand-mark">▦</span> MATCHDAY <i>·</i> LOCK SCREEN MAKER</p>
            <h1 className="hero-title"><span>하루에도 몇 번씩</span><span>경기 일정을 찾는다면?!</span></h1>
            <p className="hero-description">
              <span>응원하는 <em>종목과 구단</em>을 선택하면</span>
              <span><em>이번 달 경기 일정</em>을 <em>나만의 잠금화면</em>으로 만들어드립니다.</span>
            </p>
          </div>

          <div className="step">
            <div className="step-title"><b>01</b><span>구단 선택</span></div>
            <div className="sport-tabs">
              {sportOptions.map((item) => <button key={item.id} className={primarySport(sport) === item.id ? "active" : ""} onClick={() => selectSportTab(item.id)}>{item.label}</button>)}
            </div>
            {(sport === "kfootball" || sport === "wfootball") && (
              <div className="football-tabs" aria-label="축구 범위 선택">
                <button className={sport === "kfootball" ? "active" : ""} onClick={() => selectSport("kfootball")}>K리그</button>
                <button className={sport === "wfootball" ? "active" : ""} onClick={() => selectSport("wfootball")}>해외축구</button>
              </div>
            )}
            <div className="league-tabs">
              {leagues.map((item) => <button key={item} className={league === item ? "active" : ""} onClick={() => selectLeague(item)}>{item}</button>)}
            </div>
            <div className="team-grid">
              {visibleTeams.map((item) => (
                <button key={item.id} className={`team-card ${teamId === item.id ? "selected" : ""}`} onClick={() => setTeamId(item.id)} style={{ "--team": item.primary, "--mascot-bg": mascotBadgeTone(item, clubEmojiOverrides[item.id]?.trim() || mascotSymbol(item)) } as React.CSSProperties}>
                  <span className="mini-badge" aria-label={`${item.name} 마스코트`}>{clubEmojiOverrides[item.id]?.trim() || mascotSymbol(item)}</span>
                  <span><small>{item.city}</small><strong>{item.name}</strong></span>
                </button>
              ))}
            </div>
            <div className={`sync-bar ${syncState}`}>
              <div><strong>{syncState === "loading" ? "최신 일정을 불러오는 중…" : syncState === "error" ? "일정을 불러오지 못했습니다" : syncedAt ? formatSyncedDate(syncedAt) : "최신 일정 동기화 준비"}</strong><small>{syncState === "error" ? "인터넷 연결을 확인하거나 아래에서 직접 편집하세요." : syncedAt ? `네이버 스포츠 · ${new Date(syncedAt).toLocaleString("ko-KR")} 기준` : "API 키 없이 공개 일정과 연결"}</small></div>
              <button onClick={() => void syncSchedule()} disabled={syncState === "loading"}>{syncState === "loading" ? "···" : "↻ 새로고침"}</button>
            </div>
          </div>

          <div className="step">
            <div className="step-title"><b>02</b><span>월 선택</span></div>
            <div className="month-choice">
              <label><span>직접 입력</span><input className="field" inputMode="numeric" maxLength={7} placeholder="2026-07" value={monthText} onChange={(event) => updateMonth(event.target.value)} onBlur={() => { if (monthText !== month) setMonthText(month); }} /></label>
              <label><span>캘린더에서 선택</span><input className="field" type="month" aria-label="캘린더에서 월 선택" value={month} onChange={(event) => updateMonth(event.target.value)} /></label>
            </div>
            <small className="month-help">직접 입력은 YYYY-MM 형식으로 입력하세요.</small>
          </div>

          <div className="quick-start-note">
            <span>✓</span><div><strong>기본 설정이 끝났어요</strong><small>오른쪽 미리보기에서 바로 확인하고 저장할 수 있어요. 더 꾸미고 싶다면 아래 옵션을 열어보세요.</small></div>
          </div>

          <button className={`design-toggle ${showDesign ? "open" : ""}`} onClick={() => setShowDesign((current) => !current)} aria-expanded={showDesign} aria-controls="design-options">
            <span><strong>디자인 꾸미기</strong><small>기기 · 배경 · 색상 · 일정 표시를 설정해보세요</small></span>
            <b>{showDesign ? "접기 −" : "열기 +"}</b>
          </button>

          {showDesign && (
            <div className="design-panel" id="design-options">
              <div className="step two-col">
                <div>
                  <div className="step-title"><span>기기 선택</span></div>
                  <div className="device-picker">
                    <button type="button" className="device-picker-trigger" onClick={() => setShowDeviceMenu((current) => !current)} aria-expanded={showDeviceMenu} aria-controls="device-options">
                      <span>{deviceId === "custom" ? "커스텀" : selectedDevice.name}</span>
                      <b aria-hidden="true">{showDeviceMenu ? "⌃" : "⌄"}</b>
                    </button>
                    {showDeviceMenu && (
                      <div className="device-picker-menu" id="device-options" role="listbox" aria-label="기기 선택">
                        <input className="device-search" value={deviceQuery} onChange={(event) => setDeviceQuery(event.target.value)} placeholder="기기명 또는 연도로 검색" aria-label="기기 검색" />
                        {recentDevices.length > 0 && !deviceQuery && <div className="device-picker-group recent-devices"><p>최근 선택</p>{recentDevices.map((item) => (
                          <button type="button" key={item.id} role="option" aria-selected={deviceId === item.id} className={deviceId === item.id ? "selected" : ""} onClick={() => { setDeviceId(item.id); setRecentDeviceIds((current) => [item.id, ...current.filter((id) => id !== item.id)].slice(0, 3)); setShowDeviceMenu(false); }}><strong>{item.name}</strong><small>{item.width} × {item.height}px</small></button>
                        ))}</div>}
                        {deviceResults.map((group) => (
                          <div className="device-picker-group" key={group.label}>
                            <p>{group.label}</p>
                            {group.items.map((item) => (
                              <button type="button" key={item.id} role="option" aria-selected={deviceId === item.id} className={deviceId === item.id ? "selected" : ""} onClick={() => { setDeviceId(item.id); setRecentDeviceIds((current) => item.id === "custom" ? current : [item.id, ...current.filter((id) => id !== item.id)].slice(0, 3)); setShowDeviceMenu(false); }}>
                                <strong>{item.id === "custom" ? "커스텀" : item.name}</strong>
                                <small>{item.id === "custom" ? "원하는 배경화면 크기 직접 입력" : `${item.width} × ${item.height}px`}</small>
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {deviceId === "custom" && (
                    <div className="custom-size">
                      <label>가로<input type="number" min="320" max="5000" value={customWidth} onChange={(event) => setCustomWidth(Math.max(320, Number(event.target.value)))} /></label>
                      <span>×</span>
                      <label>세로<input type="number" min="480" max="6000" value={customHeight} onChange={(event) => setCustomHeight(Math.max(480, Number(event.target.value)))} /></label>
                    </div>
                  )}
                  <p className="preference-note"><span>✓ 내 팀 · 내 기기 기억하기</span><small>다음 방문에도 이 브라우저에서 자동으로 불러와요.</small></p>
                </div>
                <div>
                  <div className="step-title"><span>한 주의 시작</span></div>
                  <div className="week-start" aria-label="한 주의 시작 요일">
                    <button className={weekStart === "sunday" ? "active" : ""} onClick={() => setWeekStart("sunday")}>일요일 시작</button>
                    <button className={weekStart === "monday" ? "active" : ""} onClick={() => setWeekStart("monday")}>월요일 시작</button>
                  </div>
                </div>
              </div>

              <div className="step">
                <div className="step-title"><span>홈·원정 색상</span></div>
                <div className="home-away-guide">
                  <div className="guide-head"><span>홈·원정 표시 색상</span><button onClick={() => { setHomeGameColor("#FFFFFF"); setAwayGameColor("#738095"); }}>기본값 복원</button></div>
                  <div className="guide-colors">
                    <label><input aria-label="홈 경기 색상" type="color" value={homeGameColor} onChange={(event) => setHomeGameColor(event.target.value)} /><span><strong>홈 경기</strong><small>기본 흰색 · 상대 앞에 vs</small></span></label>
                    <label><input aria-label="원정 경기 색상" type="color" value={awayGameColor} onChange={(event) => setAwayGameColor(event.target.value)} /><span><strong>원정 경기</strong><small>기본 슬레이트 블루 · 상대 앞에 @</small></span></label>
                  </div>
                </div>
              </div>

              <div className="step">
            <div className="step-title"><span>배경 · 달력 꾸미기</span></div>
            <div className="background-grid">
              {[
                { id: "team", label: "구단 컬러", colors: [team.primary, "#071327"] },
                { id: "midnight", label: "미드나잇", colors: ["#142947", "#050B15"] },
                { id: "forest", label: "포레스트", colors: ["#245B49", "#071A16"] },
                { id: "sunset", label: "선셋", colors: ["#9D4773", "#F28A5B"] },
                { id: "ivory", label: "아이보리", colors: ["#EEE8DA", "#BDAE91"] },
              ].map((item) => (
                <button key={item.id} className={backgroundMode === item.id ? "selected" : ""} onClick={() => setBackgroundMode(item.id as typeof backgroundMode)}>
                  <i style={{ background: `linear-gradient(135deg, ${item.colors[0]}, ${item.colors[1]})` }} /><span>{item.label}</span>
                </button>
              ))}
            </div>
            <div className="custom-background">
              <label className={backgroundMode === "color" ? "active" : ""}>
                <span>직접 색상 선택</span><input type="color" value={backgroundColor} onChange={(event) => { setBackgroundColor(event.target.value); setBackgroundMode("color"); }} />
              </label>
            </div>
            <label className={`upload ${backgroundMode === "photo" ? "active" : ""}`}>
              <span className="upload-icon">＋</span>
              <span><strong>내 사진을 배경으로 사용</strong><small>{backgroundImageName || "PNG, JPG · 화면에 맞게 자동으로 채웁니다"}</small></span>
              <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleBackgroundImage} />
            </label>
              <div className="calendar-style">
                <div className="calendar-style-head"><strong>달력 패널</strong><small>색상과 투명도를 조절하세요</small></div>
                <div className="calendar-style-row">
                  <label className="calendar-color"><span>색상</span><input type="color" value={calendarColor} onChange={(event) => setCalendarColor(event.target.value)} /></label>
                  <label className="calendar-opacity"><span>투명도 <b>{100 - calendarOpacity}%</b></span><input type="range" min="0" max="100" step="1" value={100 - calendarOpacity} onChange={(event) => setCalendarOpacity(100 - Number(event.target.value))} /></label>
                </div>
                <label className="calendar-text-size"><span>달력 텍스트 크기 <b>{calendarTextScale}%</b></span><input type="range" min="80" max="140" step="5" value={calendarTextScale} onChange={(event) => setCalendarTextScale(Number(event.target.value))} /></label>
              </div>
            <div className="event-marker-style">
              <div className="calendar-style-head"><strong>경기 일정 표시</strong><small>경기 칸에 표시할 내용을 선택하세요</small></div>
              <div className="event-display-tabs">
                <button className={eventDisplayMode === "text" ? "active" : ""} onClick={() => setEventDisplayMode("text")}><b>ABC</b><span>텍스트</span></button>
                <button className={eventDisplayMode === "mascot" ? "active" : ""} onClick={() => setEventDisplayMode("mascot")}><b>{selectedClubEmoji}</b><span>구단 이모지</span></button>
                <button className={eventDisplayMode === "emoji" ? "active" : ""} onClick={() => setEventDisplayMode("emoji")}><b>{homeEventEmoji || "🏠"}/{awayEventEmoji || "🚌"}</b><span>커스텀 이모지</span></button>
                <button className={eventDisplayMode === "photo" ? "active" : ""} onClick={() => setEventDisplayMode("photo")}><b>▧</b><span>사진</span></button>
              </div>
              <div className="game-time-control">
                <span><strong>경기 시간 표시</strong><small>텍스트 일정에 경기 시간을 함께 표시합니다</small></span>
                <button type="button" className={showGameTime ? "active" : ""} onClick={() => setShowGameTime((current) => !current)} aria-pressed={showGameTime}>{showGameTime ? "표시" : "숨김"}</button>
              </div>
              <p className="density-tip" role="status">{densityTip}</p>
              {eventDisplayMode === "emoji" && (
                <div className="emoji-pair">
                  <label className="emoji-input"><span>홈 경기</span><input value={homeEventEmoji} maxLength={8} onChange={(event) => setHomeEventEmoji(event.target.value)} placeholder="🏠" /></label>
                  <label className="emoji-input"><span>원정 경기</span><input value={awayEventEmoji} maxLength={8} onChange={(event) => setAwayEventEmoji(event.target.value)} placeholder="🚌" /></label>
                </div>
              )}
              {eventDisplayMode === "mascot" && (
                <div className="club-emoji-custom">
                  <label className="emoji-input"><span>현재 구단 이모지</span><input value={clubEmojiOverrides[team.id] ?? mascotSymbol(team)} maxLength={8} onChange={(event) => setClubEmojiOverrides((current) => ({ ...current, [team.id]: event.target.value }))} /></label>
                  <button type="button" onClick={() => setClubEmojiOverrides((current) => { const next = { ...current }; delete next[team.id]; return next; })}>기본값 복원</button>
                </div>
              )}
              <label className={`marker-upload ${eventDisplayMode === "photo" ? "active" : ""}`}>
                <span className="upload-icon">＋</span><span><strong>경기 날짜에 표시할 사진 선택</strong><small>{eventImageName || "사진을 고르면 경기 날짜에 원형 아이콘으로 표시됩니다"}</small></span>
                <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleEventImage} />
              </label>
            </div>
          </div>

              <button className="schedule-toggle" onClick={() => setShowEditor((current) => !current)} aria-expanded={showEditor}>
            <span>일정 직접 편집 <small>{games.length}경기</small></span><span>{showEditor ? "−" : "+"}</span>
              </button>
              {showEditor && (
            <div className="editor">
              <div className="add-row">
                <input type="date" value={newDate} onChange={(event) => setNewDate(event.target.value)} />
                <input aria-label="상대팀" placeholder="상대팀" value={newOpponent} onChange={(event) => setNewOpponent(event.target.value)} />
                <input type="time" value={newTime} onChange={(event) => setNewTime(event.target.value)} />
                <button onClick={addGame}>추가</button>
              </div>
              <div className="game-list">
                {[...games].sort((a, b) => a.date.localeCompare(b.date)).map((game) => (
                  <div key={game.id} className="game-row">
                    <button className={`venue ${game.home ? "home" : ""}`} onClick={() => setGames((current) => current.map((item) => item.id === game.id ? { ...item, home: !item.home } : item))}>{game.home ? "HOME" : "AWAY"}</button>
                    <span>{game.date.slice(5).replace("-", ".")} · {game.time}</span><strong>{game.home ? "vs" : "@"} {game.opponent}</strong>
                    <button className="delete" aria-label="경기 삭제" onClick={() => setGames((current) => current.filter((item) => item.id !== game.id))}>×</button>
                  </div>
                ))}
              </div>
            </div>
              )}
            </div>
          )}
        </aside>

        <section className="preview-panel">
          <div className="preview-head">
            <div><p>LIVE PREVIEW</p><strong>{device.name}</strong><span>{device.width} × {device.height}px</span></div>
            <div className="export-actions"><div className="export-quality" aria-label="저장 해상도"><span>저장 해상도</span><div><button type="button" className={exportQuality === "native" ? "active" : ""} onClick={() => setExportQuality("native")}>원본</button><button type="button" className={exportQuality === "double" ? "active" : ""} onClick={() => setExportQuality("double")} disabled={!canExportDouble}>2× 고화질</button></div></div><button className="download" onClick={download}>저장↓</button></div>
          </div>
          <p className="export-note">{renderScale === 2 ? `2× 고화질 · ${device.width * 2} × ${device.height * 2}px로 다시 그려 저장합니다.` : "원본 해상도 · 선택한 기기에 가장 알맞은 PNG 크기로 저장합니다."}</p>
          <div className="calendar-drag-hint"><span><strong>달력 크기 조절</strong><small>미리보기 안의 ↘ 아이콘을 잡아 드래그하면 달력의 크기와 세로 비율이 바뀝니다.</small></span><div className="resize-mode-tabs"><button type="button" className={calendarResizeMode === "locked" ? "active" : ""} onClick={() => setCalendarResizeMode("locked")}>비율 유지</button><button type="button" className={calendarResizeMode === "free" ? "active" : ""} onClick={() => setCalendarResizeMode("free")}>자유 조절</button></div><button className="resize-reset" type="button" onClick={() => { setCalendarScale(1); setCalendarRatio(1); }}>기본값 복원</button></div>
          <div className="preview-mode-controls" aria-label="미리보기 화면 선택">
            <div className="preview-mode-tabs"><button type="button" className={previewMode === "lock" ? "active" : ""} onClick={() => setPreviewMode("lock")}>잠금화면</button><button type="button" className={previewMode === "home" ? "active" : ""} onClick={() => setPreviewMode("home")}>배경화면</button></div>
            {previewMode === "lock" && <div className="lock-preview-options"><button type="button" className={showLockClock ? "active" : ""} onClick={() => setShowLockClock((current) => !current)}>시계 {showLockClock ? "표시" : "숨김"}</button><button type="button" className={showLockWidgets ? "active" : ""} onClick={() => setShowLockWidgets((current) => !current)}>위젯 {showLockWidgets ? "표시" : "숨김"}</button><button type="button" className={showSafeAreaGuide ? "active" : ""} onClick={() => setShowSafeAreaGuide((current) => !current)}>가림 영역</button></div>}
          </div>
          {previewMode === "lock" && <p className="preview-disclaimer"><span className="guide-brand"><i>▦</i> MATCHDAY</span> 점선은 시계·위젯·하단 버튼이 배경화면을 가릴 수 있는 위치예요. 저장 이미지에는 포함되지 않아요.</p>}
          <div className={`device-stage ${deviceClass} ${previewPlatform} ${safeGuideKind}`}>
            <div className={`device-frame ${previewPlatform} ${safeGuideKind}`} style={{ aspectRatio: `${device.width} / ${device.height}`, ...previewLayout }}>
              <canvas ref={canvasRef} aria-label="캘린더 배경화면 미리보기" />
              <div className={`system-preview ${previewMode} ${previewPlatform}`} aria-hidden="true">
                {previewMode === "lock" ? <>{previewPlatform === "ios" && <div className="ios-status"><span>KT ◱</span><span>▮▮▮ ◔ <b>94</b></span></div>}{showLockClock && <div className="lock-clock"><span>7월 16일 목요일</span><strong>9:41</strong></div>}{showLockWidgets && (previewPlatform === "ios" ? <div className="lock-widgets ios-lock-widgets"><i className="ios-widget widget-calendar"><b>JUL</b><strong>16</strong></i><i className="ios-widget widget-activity"><span>◔</span><b>24</b></i><i className="ios-widget widget-world-clock"><b>LON</b><strong>2:53</strong></i></div> : <div className="lock-widgets"><i>☁ 24°</i><i>⌁ 일정 없음</i></div>)}{previewPlatform === "ios" && <div className="lock-quick-actions"><i>⌕</i><i>◉</i></div>}{previewPlatform === "ios" && <div className="home-indicator" />}</> : <div className="home-dock"><i>☎</i><i>◉</i><i>✉</i><i>◌</i></div>}
              </div>
              {previewMode === "lock" && showSafeAreaGuide && <div className={`safe-area-guide ${safeGuideKind}`} aria-hidden="true"><span className="safe-area-top">{safeGuideTopLabel}</span><span className="safe-area-bottom">{safeGuideBottomLabel}</span></div>}
              <button className="calendar-resize-handle" type="button" onPointerDown={startCalendarResize} onPointerMove={resizeCalendar} onPointerUp={stopCalendarResize} onPointerCancel={stopCalendarResize} aria-label="달력 크기와 비율 조절">↘</button>
            </div>
          </div>
          <p className="privacy">이미지와 일정은 브라우저 밖으로 전송되지 않습니다.</p>
        </section>
      </section>
      {downloadNotice && <div className="download-notice" role="status" aria-live="polite">배경화면 다운로드를 시작했어요</div>}
      {saveMessage && (
        <div className="save-toast-backdrop" role="presentation">
          <div className="save-toast" role="status" aria-live="polite">
            <button className="save-toast-close" onClick={() => setSaveMessage(null)} aria-label="저장 완료 메시지 닫기">×</button>
            <p className="save-toast-headline">{saveMessage.headline}</p>
            <p className="save-toast-summary">{saveMessage.summary}</p>
            <div className="save-toast-tags">{saveMessage.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <button className="save-toast-dismiss" onClick={() => setSaveMessage(null)}>닫기</button>
          </div>
        </div>
      )}
    </main>
  );
}
