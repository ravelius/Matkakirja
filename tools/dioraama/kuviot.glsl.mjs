// DIORAAMAN KUVIOT — GLSL-ESIKATSELU (Linnanrakentaja erä 2b, 29.9.2026, ali-agentti P2). SAMA
// KAAVA kuin natiivin Assets/Matkakirja/Linssit/Resources/Varjostimet/DioraamaKuviot.hlsl — pidä
// synkassa (tyyppinumerot ja kaavat identtiset, vain kielen syntaksi eroaa: vecN ei floatN,
// fract ei frac, mix ei lerp, mod ei fmod, ei saturatea). Speksi: docs/raportit/
// dioraama-rajapinnat-era2b-20260929.md kohta 2. Kutsuja: tools/dioraama/esikatselu-pinnat.mjs
// (THREE.js onBeforeCompile, injektoi KUVIOT_GLSL:n fragment-varjostimen `#include <common>`
// -kohtaan — EI include-guardia, koska merkkijono liitetään vain kerran per materiaalin käännös).
//
// DioraamaKuvio palauttaa albedon KERTOIMEN (≈ 0,75…1,15). parametrit = (koko_u, koko_v, sauma,
// vaihtelu) = PINNAT[id].kuvio. `satunnainen` = COLOR_0.B (rakenna.mjs: osan siemenellä arvottu
// satunnaisluku) sävyttää KOKONAISUUTTA: 1 + vaihtelu·(satunnainen−0,5) + pieni lämpö/kylmyys-
// sävysiirto. mod(rivi, 2.0) on turvallinen (ei negatiivisen syötteen fmod/mod-eroa HLSL:n
// kanssa), koska DK_SIIRTO pitää `c`:n (ja siis `rivi`:n) aina positiivisena.
export const KUVIOT_GLSL = `
#define DK_SIIRTO 1000.0

float DioraamaHash(vec2 p)
{
    vec3 p3 = fract(p.xyx * vec3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.x + p3.y) * p3.z);
}

// Bilineaarinen arvokohina (hash + smoothstep-interpolointi neljästä naapurista) — halpa, ei tekstuuria.
float DioraamaArvokohina(vec2 p)
{
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = DioraamaHash(i);
    float b = DioraamaHash(i + vec2(1.0, 0.0));
    float c = DioraamaHash(i + vec2(0.0, 1.0));
    float d = DioraamaHash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// 2 oktaavin fbm (pehmeä läikikkyys, rappaus/kallio): matala taajuus + hieno lisä.
float DioraamaFbm2(vec2 p)
{
    return DioraamaArvokohina(p) * 0.65 + DioraamaArvokohina(p * 2.7 + 11.0) * 0.35;
}

// Kaksiakselinen solukko (kivi, tiili): UV jaettuna koko_u × koko_v -soluihin, tummat saumat
// reunoilla (sauma), solun oma sävy hashista (out savy). satunnainenLimitys = true: kivi
// (epäsäännöllinen, rivikohtainen satunnainen sivusiirto); false: tiili (säännöllinen puoliksi
// vaihtuva "juokseva limitys").
float DioraamaSolukko(vec2 uv, vec2 koko, float sauma, bool satunnainenLimitys, out float savy)
{
    vec2 c = (uv + DK_SIIRTO) / max(koko, 0.02);
    float rivi = floor(c.y);
    c.x += satunnainenLimitys ? DioraamaHash(vec2(rivi, 3.7)) * 0.9 : 0.5 * mod(rivi, 2.0);
    vec2 solu = floor(c);
    vec2 f = fract(c);
    float reunaU = min(f.x, 1.0 - f.x);
    float reunaV = min(f.y, 1.0 - f.y);
    float s = max(sauma, 0.01);
    savy = DioraamaHash(solu + 4.7);
    return smoothstep(0.0, s, reunaU) * smoothstep(0.0, s, reunaV);
}

// Yksiakselinen raidoitus (lankku): jako yhdellä akselilla, solun (lankun) sävy hashista.
float DioraamaRaidat(float akseli, float koko, float sauma, out float savy)
{
    float c = (akseli + DK_SIIRTO) / max(koko, 0.02);
    float solu = floor(c);
    float f = fract(c);
    float reuna = min(f, 1.0 - f);
    savy = DioraamaHash(vec2(solu, 5.3));
    return smoothstep(0.0, max(sauma, 0.01), reuna);
}

// Tyyppikohtainen albedokerroin (ennen \`satunnainen\`-kokonaissävytystä, ks. DioraamaKuvio).
// tyyppinumerot: 0 tasainen, 1 kivi, 2 puu, 3 lankku, 4 rappaus, 5 tiili, 6 kallio, 7 vesi,
// 8 metalli, 9 kangas, 10 olki (docs/raportit/dioraama-rajapinnat-era2b-20260929.md kohta 2).
float DioraamaKerroin(int tyyppi, vec4 parametrit, vec2 uv, vec3 maailma)
{
    float koko_u = max(parametrit.x, 0.02);
    float koko_v = max(parametrit.y, 0.02);
    float sauma = parametrit.z;
    float vaihtelu = parametrit.w;
    float savy = 0.5;

    if (tyyppi == 1) {
        float sm = DioraamaSolukko(uv, vec2(koko_u, koko_v), sauma, true, savy);
        return mix(0.8, 1.0, sm) * mix(1.0 - vaihtelu, 1.0 + vaihtelu, savy);
    }
    if (tyyppi == 2) {
        float raidat = DioraamaArvokohina(vec2(uv.x / koko_u * 1.2, uv.y / koko_v * 16.0) + DK_SIIRTO);
        float hieno = DioraamaArvokohina(vec2(uv.x / koko_u * 5.0, uv.y / koko_v * 55.0) + DK_SIIRTO);
        return mix(1.0 - vaihtelu * 0.9, 1.0 + vaihtelu * 0.7, raidat * 0.7 + hieno * 0.3);
    }
    if (tyyppi == 3) {
        float sm = DioraamaRaidat(uv.x, koko_u, sauma, savy);
        float syy = DioraamaArvokohina(vec2(savy * 37.0, uv.y / koko_v * 20.0) + DK_SIIRTO) * 0.5;
        return mix(0.85, 1.0, sm) * mix(1.0 - vaihtelu, 1.0 + vaihtelu, savy * 0.7 + syy * 0.3);
    }
    if (tyyppi == 4) {
        float m = DioraamaFbm2((uv + DK_SIIRTO) / max(koko_u, 0.3));
        return mix(1.0 - vaihtelu * 0.7, 1.0 + vaihtelu * 0.7, m);
    }
    if (tyyppi == 5) {
        float sm = DioraamaSolukko(uv, vec2(koko_u, koko_v), sauma, false, savy);
        return mix(0.75, 1.0, sm) * mix(1.0 - vaihtelu * 0.6, 1.0 + vaihtelu * 0.6, savy);
    }
    if (tyyppi == 6) {
        float m = DioraamaFbm2(maailma.xz * max(koko_u, 0.05) + maailma.y * 0.1);
        return mix(1.0 - vaihtelu, 1.0 + vaihtelu * 0.8, m);
    }
    if (tyyppi == 7) {
        float m = DioraamaArvokohina((uv + DK_SIIRTO) / max(koko_u, 0.5));
        return mix(1.0 - vaihtelu * 0.3, 1.0 + vaihtelu * 0.3, m);
    }
    if (tyyppi == 8) {
        float m = DioraamaArvokohina(vec2(uv.x / koko_u * 3.0, uv.y / koko_v * 70.0) + DK_SIIRTO);
        return mix(1.0 - vaihtelu * 0.5, 1.0 + vaihtelu * 0.5, m);
    }
    if (tyyppi == 9) {
        vec2 c = (uv + DK_SIIRTO) / max(vec2(koko_u, koko_v), 0.02) * 3.1416;
        float kude = 0.5 + 0.5 * sin(c.x) * sin(c.y);
        return mix(1.0 - vaihtelu * 0.4, 1.0 + vaihtelu * 0.4, kude);
    }
    if (tyyppi == 10) {
        float m = DioraamaArvokohina(vec2(uv.x / koko_u * 1.5, uv.y / koko_v * 40.0) + DK_SIIRTO);
        float hieno = DioraamaHash(floor((uv + DK_SIIRTO) / max(koko_u, 0.02) * vec2(9.0, 1.0)));
        return mix(1.0 - vaihtelu, 1.0 + vaihtelu * 0.6, m * 0.6 + hieno * 0.4);
    }
    return 1.0;
}

vec3 DioraamaKuvio(int tyyppi, vec4 parametrit, vec2 uv, vec3 maailma, float satunnainen)
{
    float kerroin = DioraamaKerroin(tyyppi, parametrit, uv, maailma);
    float kokonaisSavy = 1.0 + parametrit.w * (satunnainen - 0.5);
    vec3 savysiirto = vec3(1.0 + 0.04 * (satunnainen - 0.5), 1.0, 1.0 - 0.04 * (satunnainen - 0.5));
    return clamp(kerroin * kokonaisSavy, 0.7, 1.2) * savysiirto;
}
`;

// Tyyppinumerot (sama kuin natiivin DioraamaKuviot.hlsl): PINNAT[id].kuvio.tyyppi (merkkijono) →
// numero uKuvioTyyppi-uniformille (esikatselu-pinnat.mjs).
export const KUVIOTYYPIT = {
  tasainen: 0,
  kivi: 1,
  puu: 2,
  lankku: 3,
  rappaus: 4,
  tiili: 5,
  kallio: 6,
  vesi: 7,
  metalli: 8,
  kangas: 9,
  olki: 10,
};
