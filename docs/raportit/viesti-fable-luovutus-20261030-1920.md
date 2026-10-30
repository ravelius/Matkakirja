# PT:n luovutus 30.10.2026 klo 19.20

Edellinen: viesti-fable-luovutus-20261030-1655.md. Keskustelu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-30-klo-1700-1918.md.
Viestit aina id:llä (mcp__ccd_session_mgmt__send_message). Osoitteet: /Users/Shared/Claude/osoitekirja.md.

## Tehty
- OMISTAJAN PÄÄTÖS 17.26: LAV v199 (Taihemen, sivuhallit, Taihedian) → paketti v99 (rakennukset-v85, c2-v24, tausta-v78, c1-v9) → ämpäri 17.40.
- LAV v100 (tausta-v79: aukion 03 vino levy pois, 2-2 LOD1/2) ja PK esto-v20 → NS runko 8d3bf122f (juna 216, vihreä).
- Osasarja v2 (60c0547ffea6, ämpäri 18.21), v3 (77f02f0fc384, 18.35; kauko 1,14 M → 65 k, LOD0 +3,1 %), v4 (9c781f204aa2: kivipinnat
  V4_kujakivi_sokkeli + taustan kuvanimet; kuitattu 19.1x, JU vie). NS EI mergeä ladontaa ennen PT:n lupaa.
- LAV pintalista-kauko-216 548440f01 (C3_muurikate_kauko sallittu): NS mergeää samassa yhteydessä kuin ladonnan.
- KK 19.1x: Postivahdin oma nollaus 30 %:ssa ilman PT:n pyyntöä → Raamattu 7.37 + aloitusviesti + loki (PR 5650).
- OMISTAJAN PÄÄTÖS 19.12 (loki PR 5651, mergetty ennen checkejä, vain loki): ei loputonta rataa, pelaaja valitsee reitit nykyisellä palatsialueella;
  valo heti ulko-osien jälkeen nopeimmalla menetelmällä; sisätilat uusi rivi (piirrokset ensin); viikonlopuksi toinen tili → yötä ei hiljennetä.
- Valosuunnitelma hyväksytty (/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/valosuunnitelma-20261030.md): leivottu, alueittaiset kartat,
  aukkotulpat, kaukoon kärkivärit, aurinko pelin 30°/188°:een. VS tekee vaiheet 1–2 nyt.
- Postivahti nollattu 19.0x; aloitusviesti lähetetty 19.2x (kierros seisoi 19.07–19.2x, koska PT ei lähettänyt sitä heti).

## Kesken (jono)
1. PK (pullonkaula): osasarja-v4 kytkentä (OsasarjaKansio v3 → v4; ladonta.json muuttui: pintanäyteosat), lopullinen pari 8 havainnekohtaa +
   suorituskykymittarit → PT. Sitten 1 rivi: mitä reittivalinta vaatii. Lupa NS:lle mergeen vasta, kun pari ja mittarit ovat kunnossa
   (sisältää PK:n haaran pelikoodari/osasarja-v3-216 + esto v22 + LAV pintalista 548440f01).
2. VS: kaukomuurien LOD1/LOD2-sävytarkistus (kooste tulossa) + valovaiheet 1–2. Vaihe 3 PK:lle ja vaihe 4 LAV:lle vasta ladonnan jälkeen.
3. LAV: nollautuu (fe1e1d667); aloitusviestiin pyydetty Postivahdilta valovaihe 4 (Blender-ketjun valmistelu).
4. NUI: juoksupeli Pelit-valikkoon (7), sitten nimettyjen paikkojen nimet (5) → kuvat PT:lle ennen NS:ää.
5. Tilinvaihto: nykyinen tili loppuu arviolta su 1.11. ~10–12; omistajan toimet lähetetty KK:lle valmiina (tilinvaihto.md 0.2).
6. Juna 216 = 8d3bf122f; lukitus ja TF vain omistajan pyynnöstä.

## Säännöt, jotka opin
- Nollatulle Postivahdille aloitusviesti heti (docs/aloitusviestit/postivahti.md), muuten kierros seisoo.
- JU:n kuiva-ajo: alikansioissa ei .md- eikä SHA256SUMS-tiedostoja; LAHTEET.md:ssä rivi "Lisenssi: …". Pieni korjaus (vain yksi rivi pois) =
  kuittaus voimassa, JU vertaa diffillä.
- NS mergeää JU:n osoitinrivistä itse; kun pari on kesken, osoitinrivi vain PK:lle ja erillinen "älä mergeä" NS:lle.
- Asemataulun ladonta- ja juoksupelirivit päivitetty 19.2x; ts-päivitys: scratchpad/ts.py-tyyppinen skripti myös ylätason ts.
