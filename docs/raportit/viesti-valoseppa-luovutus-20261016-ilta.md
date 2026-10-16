# Valoseppä – luovutus 16.10.2026 ilta (18.35, KOVA RAJA 38 %)

Luovuttaja: Valoseppä (Opus, high), sessio local_c238f4af. Edellinen: viesti-valoseppa-luovutus-20261016-iltapaiva.md (5f5ed6652).
Viestit `send_message` TÄYDELLÄ id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, LR local_996d60ab-b4af-4172-ad31-f8e948f141a3, Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2. Jono/päiväkirja: $D/JONO.md (kaikki tämän vuoron rivit 13.5x–18.35 lopussa). Loki: $D/testi196-uusi.log.
proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto. Simulaattori A26BC7D0 on yhteinen: ÄLÄ sammuta sitä käsin (katkaisin 17.3x savuagentin ajon).

## 0. ENSIMMÄISENÄ: TAUSTA-AJOT (käynnissä luovutushetkellä, ketjuttuvat simun vapautuessa)
Tarkista `tail $D/testi196-uusi.log` ja tulostiedostot; jos ajo kuoli nollauksessa, aja uudelleen samalla skriptillä (taustalla).
1) **Raketin savu k7** (juna 197): `zsh $D/luuppi-koe7.zsh; zsh $D/havainne9/koe7-arkki.zsh` (käännös 4f66c10f kuvaus alkoi 18.34) →
   havainne9/koe7/raketti-koe7-arkki.jpg + raketti-savu-koe7.mp4; ruudut: `ffmpeg -i …mp4 -vf "fps=1,scale=360:-2,tile=7x2" -frames:v 1 video-ruudut.jpg`.
   → PT 3 riviä (PT vie omistajalle ennen kytkentää junaan 197). Vertaa koe6:een (havainne9/koe6/).
2) **Varjopuolen kaupunkitarkistus**: `zsh $D/louvre1/varjopuoli/kaupungit.zsh` (Notre-Dame e1/e3, Kuninkaanlinna 01/02, vanha/uusi) →
   louvre1/varjopuoli/kaupungit/arkki.jpg → PT. Jos ei huononnusta: SHA NS:lle 197-jonoon (kohta 2) + v6k20 Julkaisijalle (kohta 3).
3) **Louvre k49s** (LR, ei kiire): `zsh $D/louvre1/k49-kaikki.zsh` → louvre1/lahi-L1-L3/k49s/arkki.jpg + B.png (kulma B: pyramidi ja kirkas kivi
   Googlen ympäristössä) → LR (+ PT). Paketti v6k18-lv2f-k49s on jo valmis.
4) **Louvre L1b + pelin oletuskamera** (Sonnet-agentti, LR/PT): raportti louvre1/l1b/AGENTTI-l1b.md, kuvat louvre1/lahi-L1-L3/k48-L1b/.
   Jos agenttia ei enää ole: L1b-kulma `L1b<TAB>48.861339 2.335970 100.0 85.00 32.70 133.99` (skriptit-20261009/l1b-pariisi.txt), appi
   t197-varjopuoli, OMAT louvre1/v6k18-lv2f-k48s, var-oletus.txt; oletuskamera: kierroksen siirto Louvreen (OpasValikko/MuseoSovitin siirry).
   Pyramidin möhkäle näkyy vain matalassa lähikulmassa (louvre1/varjopuoli/L1-pyramidi-zoom.jpg); kulma B (k36s-pari) siisti.

## 1. PÄÄTÖKSET TÄLLÄ VUOROLLA
- Juna 196: raketin savu k5 = juna196-iss **6cbb7aba3** → NS:n runko **d6d97384e** (omistaja 17.45 "junan voi julkaista jo ilman näitä").
- Omistaja 17.44 hylkäsi k5:n savun ("vain järven päälle"); 18.20 k6 "Oikea suunta, jatketaan" → k7 (harmaampi, märkä kiilto, oranssi).
- Omistaja 18.27: Louvre k48 junaan 197. PT: varjopuoli f23d46f7f hyväksytty junaan 197 kaupunkitarkistuksen jälkeen.
- Valas: OpenVAT GPL-3.0 / openvat-unity ilman lisenssiä → PT hyväksyi oman VAT-paiston Blender-Pythonilla + oman varjostimen (ei latauksia).

## 2. HAARAT (proto-git)
- **linssiseppa2/iss-luuppi-196** (wt/proto-linssiseppa2-luuppi): savu k1 53721fc75 … k5 586716ff0 (juna 196), k6 8f055efbd (piirtojärjestys:
  savu alustan päälle), k7 **079a231e3** (juna 197, odottaa omistajaa). Raportit $D/havainne9/AGENTTI-savu-k{1..7}.md. Junaan 197 kytkentä:
  NS:n ohje – tee 196:n lukitun rungon (d6d97384e) päälle → juna197-haara + merge luuppi; tarkista kaksoisrivit RakettiLaukaisu.cs:ssä.
- **linssiseppa2/omat-varjopuoli-197 f23d46f7f** (wt/proto-linssiseppa2-varjopuoli, pohja d6d97384e): OmaMalli.shader taivas- + maaheijastus,
  AO vain epäsuoraan; säätimet omataivas/omamaa/omaaoraja/omavarjopuoli 0; 1928/1928; käännös a9fd5a79b (appi t197-varjopuoli).
  Raportti louvre1/varjopuoli/AGENTTI-varjopuoli.md, vertailu.jpg. → NS 197-jono kaupunkitarkistuksen jälkeen.
- juna196-iss 6cbb7aba3 (NS:llä, junassa 196).

## 3. LOUVRE-TUOTANTOPAKETTI v6k20 (valmis, EI vielä viety)
- $D/pariisi-v3/v6k20 (228 Mt) = v6k19 + Louvre k48 syvyysleivottu (louvre1/syvyys/glb-k48, md5 = _valmiit/louvre-v1/glb), 12 kohdetta,
  leikkaus 722, tekijärivi INTEGRAATIO-k36:n mukaan, portti 0 (ktx-vaiheen LOD1-rajavaroitus kuten k36s). Skripti louvre1/rakenna-v6k20.py.
- Vienti Julkaisijalle (PT: yhdessä f23d46f7f:n kanssa, kaupunkiarkin jälkeen): kopio _valmiit/omat-mallit-vienti-20261016-v6k20/kartta/omat-mallit/v6k20
  + README (R2, osoitin uusin-4 → v6k20 junan 197 lukituksessa). Kysy Julkaisijan id osoitekirjasta.

## 4. JONO (PT:n järjestys)
1) Taustatulokset kohdasta 0 → PT/LR.
2) Savu k7 omistajalle → kytkentä junaan 197 (tai k8 palautteen mukaan; savuagentin raportit havainne9/).
3) Varjopuoli → NS + v6k20 → Julkaisija.
4) VALAS junaan 197: Blender-nestesimulaatio iskusta + oma VAT-paisto (Blender-Python) + oma varjostin, GPU-pisarat, usva, vaahto,
   aaltorenkaat; putki savu-blender/README.md; Codex v1/v2 $D/valas-havainne/.
5) Junaan 197 (vanhat): nousun hehkupallo pienemmäksi, s1:n musta Maa salamoiden välissä, ISS-efektit k6, LR:n märän betonin ehdotus
   (AGENTTI-savu-k6.md).

## 5. MUUTA
- Levy: poistettu vanhat appit (koe1–4, k4, k5) ja Louvre k35s/k46s/k47s + välituotteet; jäljellä appit t196-luuppi-koe5/-koe6/-koe7,
  t197-varjopuoli. Sääntö 2 uusinta + käytössä.
- Pariisin omat mallit valaistaan kiinteästi 300°:sta (KaupunkiIlmakeha.OmaAtsimuutti) – tarkoituksellista; aamukuviin `omaatsimuutti 128`.
- koe-arkkiskriptit: T = uusin todistuskansio, jossa kuvat/r2b-t3.png (video-ajo on myöhempi eikä sisällä stillejä).
