// Dioraaman proseduraaliset pinnat (Linnanrakentaja erä 2b, 29.9.2026, ali-agentti P2). Speksi:
// docs/raportit/dioraama-rajapinnat-era2b-20260929.md kohta 2. Halpa arvokohina (hash +
// bilineaarinen interpolointi), EI tekstuureja, EI silmukoita (≤ 2 oktaavin fbm). Sama kaava
// GLSL:nä esikatselussa: tools/dioraama/kuviot.glsl.mjs (KUVIOT_GLSL) — pidä kaavat SYNKASSA
// (siellä vec2/vec3/vec4, fract, mix, mod — ei saturatea; muuten identtinen).
//
// DioraamaKuvio palauttaa albedon KERTOIMEN (≈ 0,75…1,15), jolla DioraamaValaistu.shader (P1)
// kertoo pinnan värin ennen valaistusta. `parametrit` = (koko_u, koko_v, sauma, vaihtelu) ==
// PINNAT[id].kuvio (js/dioraama/pankit/pinnat.js, rakennus.json:iin sellaisenaan). `satunnainen`
// = COLOR_0.B (rakenna.mjs: osan — palikka tai resepin oma osa, esim. yksittäinen lattialaatta —
// siemenellä arvottu satunnaisluku) sävyttää KOKONAISUUTTA: 1 + vaihtelu·(satunnainen−0,5) +
// pieni lämpö/kylmyys-sävysiirto.
#ifndef MATKAKIRJA_DIORAAMAKUVIOT_INCLUDED
#define MATKAKIRJA_DIORAAMAKUVIOT_INCLUDED

// Siirto ennen floor/frac-käyttöä: pitää koordinaatit käytännössä aina positiivisina (rivien
// pariteetti fmodilla ja solunumerot pysyvät johdonmukaisina negatiivisillakin maailmankoordinaateilla).
#define DK_SIIRTO 1000.0

float DioraamaHash(float2 p)
{
    float3 p3 = frac(p.xyx * float3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yzx + 19.19);
    return frac((p3.x + p3.y) * p3.z);
}

// Bilineaarinen arvokohina (hash + smoothstep-interpolointi neljästä naapurista) — halpa, ei tekstuuria.
float DioraamaArvokohina(float2 p)
{
    float2 i = floor(p);
    float2 f = frac(p);
    float2 u = f * f * (3.0 - 2.0 * f);
    float a = DioraamaHash(i);
    float b = DioraamaHash(i + float2(1.0, 0.0));
    float c = DioraamaHash(i + float2(0.0, 1.0));
    float d = DioraamaHash(i + float2(1.0, 1.0));
    return lerp(lerp(a, b, u.x), lerp(c, d, u.x), u.y);
}

// 2 oktaavin fbm (pehmeä läikikkyys, rappaus/kallio): matala taajuus + hieno lisä.
float DioraamaFbm2(float2 p)
{
    return DioraamaArvokohina(p) * 0.65 + DioraamaArvokohina(p * 2.7 + 11.0) * 0.35;
}

// Kaksiakselinen solukko (kivi, tiili): UV jaettuna koko_u × koko_v -soluihin, tummat saumat
// reunoilla (sauma), solun oma sävy hashista (out savy). satunnainenLimitys = true: kivi
// (epäsäännöllinen, rivikohtainen satunnainen sivusiirto); false: tiili (säännöllinen puoliksi
// vaihtuva "juokseva limitys").
float DioraamaSolukko(float2 uv, float2 koko, float sauma, bool satunnainenLimitys, out float savy)
{
    float2 c = (uv + DK_SIIRTO) / max(koko, 0.02);
    float rivi = floor(c.y);
    c.x += satunnainenLimitys ? DioraamaHash(float2(rivi, 3.7)) * 0.9 : 0.5 * fmod(rivi, 2.0);
    float2 solu = floor(c);
    float2 f = frac(c);
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
    float f = frac(c);
    float reuna = min(f, 1.0 - f);
    savy = DioraamaHash(float2(solu, 5.3));
    return smoothstep(0.0, max(sauma, 0.01), reuna);
}

// Tyyppikohtainen albedokerroin (ennen `satunnainen`-kokonaissävytystä, ks. DioraamaKuvio).
// tyyppinumerot: 0 tasainen, 1 kivi, 2 puu, 3 lankku, 4 rappaus, 5 tiili, 6 kallio, 7 vesi,
// 8 metalli, 9 kangas, 10 olki (docs/raportit/dioraama-rajapinnat-era2b-20260929.md kohta 2).
float DioraamaKerroin(int tyyppi, float4 parametrit, float2 uv, float3 maailma)
{
    float koko_u = max(parametrit.x, 0.02);
    float koko_v = max(parametrit.y, 0.02);
    float sauma = parametrit.z;
    float vaihtelu = parametrit.w;
    float savy = 0.5;

    if (tyyppi == 1) { // kivi: epäsäännölliset kivet UV-tasossa (koko_u × koko_v) + saumat tummempina
        float sm = DioraamaSolukko(uv, float2(koko_u, koko_v), sauma, true, savy);
        return lerp(0.8, 1.0, sm) * lerp(1.0 - vaihtelu, 1.0 + vaihtelu, savy);
    }
    if (tyyppi == 2) { // puu: syyraidat u-suuntaan (kohina hitaasti u:ssa, nopeasti v:ssä)
        float raidat = DioraamaArvokohina(float2(uv.x / koko_u * 1.2, uv.y / koko_v * 16.0) + DK_SIIRTO);
        float hieno = DioraamaArvokohina(float2(uv.x / koko_u * 5.0, uv.y / koko_v * 55.0) + DK_SIIRTO);
        return lerp(1.0 - vaihtelu * 0.9, 1.0 + vaihtelu * 0.7, raidat * 0.7 + hieno * 0.3);
    }
    if (tyyppi == 3) { // lankku: lankut v-suuntaan (jako u:ssa), lankun sävy hashista
        float sm = DioraamaRaidat(uv.x, koko_u, sauma, savy);
        float syy = DioraamaArvokohina(float2(savy * 37.0, uv.y / koko_v * 20.0) + DK_SIIRTO) * 0.5;
        return lerp(0.85, 1.0, sm) * lerp(1.0 - vaihtelu, 1.0 + vaihtelu, savy * 0.7 + syy * 0.3);
    }
    if (tyyppi == 4) { // rappaus: pehmeä läikikkyys, matala taajuus
        float m = DioraamaFbm2((uv + DK_SIIRTO) / max(koko_u, 0.3));
        return lerp(1.0 - vaihtelu * 0.7, 1.0 + vaihtelu * 0.7, m);
    }
    if (tyyppi == 5) { // tiili: säännöllinen juokseva limitys, tummat laastisaumat
        float sm = DioraamaSolukko(uv, float2(koko_u, koko_v), sauma, false, savy);
        return lerp(0.75, 1.0, sm) * lerp(1.0 - vaihtelu * 0.6, 1.0 + vaihtelu * 0.6, savy);
    }
    if (tyyppi == 6) { // kallio: karkea fbm maailmankoordinaateista (ei UV-saumoja)
        float m = DioraamaFbm2(maailma.xz * max(koko_u, 0.05) + maailma.y * 0.1);
        return lerp(1.0 - vaihtelu, 1.0 + vaihtelu * 0.8, m);
    }
    if (tyyppi == 7) { // vesi: hillitty väreily (virtaus hoidetaan UV-siirtona muualla)
        float m = DioraamaArvokohina((uv + DK_SIIRTO) / max(koko_u, 0.5));
        return lerp(1.0 - vaihtelu * 0.3, 1.0 + vaihtelu * 0.3, m);
    }
    if (tyyppi == 8) { // metalli: hienot harjausraidat yhteen suuntaan
        float m = DioraamaArvokohina(float2(uv.x / koko_u * 3.0, uv.y / koko_v * 70.0) + DK_SIIRTO);
        return lerp(1.0 - vaihtelu * 0.5, 1.0 + vaihtelu * 0.5, m);
    }
    if (tyyppi == 9) { // kangas: säännöllinen kudos (kaksi kohtisuoraa raitaa)
        float2 c = (uv + DK_SIIRTO) / max(float2(koko_u, koko_v), 0.02) * 3.1416;
        float kude = 0.5 + 0.5 * sin(c.x) * sin(c.y);
        return lerp(1.0 - vaihtelu * 0.4, 1.0 + vaihtelu * 0.4, kude);
    }
    if (tyyppi == 10) { // olki: ohuet kaoottiset korret (voimakas anisotropia)
        float m = DioraamaArvokohina(float2(uv.x / koko_u * 1.5, uv.y / koko_v * 40.0) + DK_SIIRTO);
        float hieno = DioraamaHash(floor((uv + DK_SIIRTO) / max(koko_u, 0.02) * float2(9.0, 1.0)));
        return lerp(1.0 - vaihtelu, 1.0 + vaihtelu * 0.6, m * 0.6 + hieno * 0.4);
    }
    return 1.0; // 0 tasainen (ja tuntemattomat tyypit) — ei muutosta
}

// Julkinen rajapinta (kohta 2): albedon kerroin ≈ 0,75…1,15. `satunnainen` (COLOR_0.B) sävyttää
// kokonaisuutta vaihtelun verran + pieni lämpö/kylmyys-sävysiirto (ei vaikuta pattern-muotoon).
float3 DioraamaKuvio(int tyyppi, float4 parametrit, float2 uv, float3 maailma, float satunnainen)
{
    float kerroin = DioraamaKerroin(tyyppi, parametrit, uv, maailma);
    float kokonaisSavy = 1.0 + parametrit.w * (satunnainen - 0.5);
    float3 savysiirto = float3(1.0 + 0.04 * (satunnainen - 0.5), 1.0, 1.0 - 0.04 * (satunnainen - 0.5));
    return clamp(kerroin * kokonaisSavy, 0.7, 1.2) * savysiirto;
}

#endif
