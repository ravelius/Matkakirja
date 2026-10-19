# Pelikoodarin luovutus 19.10.2026 klo 09.25 (Postivahdin KOVA RAJA)

Edellinen: viesti-pelikoodari-luovutus-20261018-0952.md (LISÄYKSET 19.10. sen lopussa). Rooli: Pelikoodari (Opus, high), id osoitekirjassa.
Proto-repo: /Users/Shared/Claude/proto-3d/Matkakirja-proto (worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*).

## ENSIN (järjestys)
1. **Rata v4 UI-mittarit** (PT 09.2x, omistaja): Ylapalkin ELÄMÄPALKKI-pohja (UI/Ylapalkki.cs, ElamaLohkoja 8 / ElamaPunaisia 3; Raamattu
   luku 4: hyväksytty pohja käy vastaaviin) KAHTENA RIVINÄ juoksupelin HUDiin: elinvoima ja viitta-energia; viitan VARANTO-osuus (VarantoE 20)
   erottuvana lohkona. RIMPUILU (omistaja 09.08, korvaa aiemman): kiinni jäädessä RIMPUILE-NAPPI (Ohjausnappi-pohja, kuten Spurtti) + palkki
   samasta elämäpalkkipohjasta, etenee 1/10 per napautus (RimpuiluTarve = 10, tehty 8a7d84932), elinvoima kuluu näkyvästi koko kiinnioloajan,
   PIENI VÄRÄHDYS per napautus (Handheld.Vibrate tai olemassa oleva haptiikka, grep "Vibrate|Haptiikka"). Ei uutta pohjaa; puuttuva → PT.
   Nyt mittarit ovat tekstilohkoina (V4Kierros.HudLukema, Palkki()).
2. **Paperilohikäärmeet kahtena lajina** (omistaja 09.13): yleinen = +1/3 viitta-energiaa (EnergiaMax/3), harvinainen = energia aina täyteen.
   Värit datasta vaihdettaviksi (KK:n ehdotus punainen yleinen, keisarillinen keltainen harvinainen; omistajan vahvistus odottaa). Nyt
   V4Lohikaarme {S, Kaytetty}, +35 kaikille (JuoksuV4.cs Lohikaarmepaikat 4 kpl) → lisää Laji + väri (esim. JuoksuV4Reitti-taulukko tai json).
3. **SK:n tekstit kytkentään**: main 7c6d3dfa8 (#4909) docs/raportit/juoksupeli-tekstit-fi-20261019.json (37 avainta, litteä) → kopioi proto
   Assets/Matkakirja/Scripts/Juoksupeli/Resources/JuoksuV4/tekstit.fi.json (+ .meta TextScriptImporter). Avainmuoto VAHVISTETTU sellaisenaan:
   juoksupeli.viitta.1–3 (esittelyn rivit, ≤ 60), juoksupeli.aarre.<id>.nimi/.teksti (10 KERÄTTÄVÄÄ tason 2 aarretta huoneissa),
   juoksupeli.rikkoutuva.<id>.nimi/.teksti (5 kulttuuriaarretta = väistettävät esteet, rikkoutuvat törmätessä), juoksupeli.lohikaarme.nimi/.teksti,
   juoksupeli.omena.herkku/.mata.teksti. Kerro SK:lle "avaimet vahvistettu" (en ehtinyt). Kerättävien aarteiden paikat tasolla 2 = alas huoneisiin
   (odottaa Codexin yläreittiä).
4. **Simuvuoro ~10.15** (JU:n jono LS → LAVASTAJA → VS → NUI → PK): JU kääntää 84357cae9:n L2:lla kansioon proto-3d/_tyo/julkaisija/juoksupeli-202-app.
   VASTAA JU:lle: lopullinen sha (uusin juoksupeli-202 = 8a7d84932, rimpuilu 10; jos ehdit mittarit ennen vuoroa, uusi sha) ja ajatko videot itse.
   Skenaario: ☰ › Pelit › Keskeneräiset › "Juoksupeli: Rata v4" ja "Juoksupeli: Rata 1"; QA `ui juoksupeli botti 1`, `ui juoksupeli v4`,
   `ui juoksupeli rata1`; video ~40 s kummastakin → PT:lle (KK). Todennäköiset hiottavat: kamera seinien läpi, materiaalien sävyt, vartijat.

## SITOVAT LINJAUKSET (omistaja 19.10. 09.10 vahvisti KK:n juoksupeliehdotukset; PT 09.1x)
Spurttiviitta tason 1 lopussa; tason 2 reitit (maa ja katot) kohtaavat porteilla/pihoilla, kattoreitti nopeampi mutta riskialttiimpi; viitta-energiaa
myös huoneista; ovi maahan joka huoneesta (ei umpikujia); katot piilotetaan pelissä (huoneet näkyvät ylhäältä, ei muutosta Codexin malleihin);
yläreitti seinien harjoja ja tukipalkkeja pitkin, hypyt talolta toiselle ja alas huoneisiin aarteille; viitta-energiassa aina varanto yhteen
alashyppyyn; paperilohikäärmeet keinuvat narussa tavallista hyppyä korkeammalla; ELINVOIMA alusta, kuluu hitaasti, nopeammin kiinni ollessa
ja kulttuuriaarteen rikkoutuessa, loppuu → alusta (tason 2 saavuttanut tasolta 2); HERKKUOMENA (punainen kiiltävä) elinvoimaa heti, MÄTÄ
OMENA (ruskea, kärpäsparvi) heittoon, osuma horjauttaa vartijan; lajit erottuvat yhdellä silmäyksellä; värähdys per rimpuilunapautus.
Grafiikka ja mallit VAIN Codexilta (PT tilaa); sillä välin harmaat paikkamerkit.

## TILA (kaikki tarkista.sh 0)
- **Juna 204** proto pelikoodari/iss-c2-204 (wt/proto-pelikoodari-iss-nopeus-204), NS:lle uusin **71d9f6c43**: B6/B7 testit 58cabb404, C2 8cdc917af,
  B2 Peruuta 9a8e797ec, C4 d2c30b96e, iPad-vipu 7d74a47a5 + SEIS-merkki a9513c71d, Mazatlán e1c172d79, Natal b467d2f6d, erillinen kuvauskamera
  ef189ffba (IssKameraKuva.NayttoElaa; NUI tekee 3 rivin muutoksen NS:n yhdistämisen jälkeen), paikat.json/keskustat.json 71d9f6c43 (runko 204
  oli punainen: SkanneriKattavuusTestit). HUOM: NE:ssä Natal ja Mazatlán nyt kahdesti lähekkäin (oikea rivi + korjattu virherivi) → jos kupolissa
  tuplanimi, poista virherivit paikat.json:sta. Peruuta-koukku d1fcf02d6 HYLÄTTY (NUI bcd63d8e9 käytössä).
- **Juoksupeli** proto pelikoodari/juoksupeli-202 (wt/proto-pelikoodari-juoksupeli-202), uusin **8a7d84932**: hahmot dd7009250 (ämpärissä
  juoksupeli/hahmot-v1), rata 1 57f0f0afe + pidennys e04149615 (jää sellaisenaan), Rata v4 572d4eb97 (maailma ämpärissä juoksupeli/maailma-v4),
  tasot 5316efacc, elinvoima/omenat/energia/lohikäärmeet 84357cae9, rimpuilu 10 8a7d84932. Peli-testit 624/624 (JuoksuV4Testit 7/7).
- Mazatlán/Natal-työkalut: scratchpad korkeus.py / viivat.py (menetelmä kommentissa e1c172d79); docs main #4902, #4903 mergetty.

## AVOIN / ODOTTAA
- Codex: kattoreitti tilattu (f1d6365fc: harjat/palkit, 2–3 nousu-/paluukohtaa, liidon laskeutumiset, paperilohikäärmeet) → tason 2 rinnakkaisreitti
  maa vs. katot (JuoksuV4Reitti: nyt yksi reitti; tarvitaan valintasolmut). Esteiden mallit + Puyin tarttumisliike odottavat KK:n linjaa.
- Codexin este-yhteenveto ei saapunut; esteet (hyppy, liuku, väistö = rikkoutuva kulttuuriaarre, yläpuomi + allas) on koodattu.
- Worktreet: ei poistettavaa ennen junan 204 mergeä (Postivahdille kerrottu).
