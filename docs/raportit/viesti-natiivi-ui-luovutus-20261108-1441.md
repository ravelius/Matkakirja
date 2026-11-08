# Natiivi-UI: luovutus 8.11.2026 klo 14.41 (jono käyty läpi koodin osalta; kolme JU-ajoa ja NS:n pm-ajo odottavat katsomista)

Korvaa luovutuksen -1322 (`git show 78a0fdb02:docs/raportit/viesti-natiivi-ui-luovutus-20261108-1322.md`): siinä yhä voimassa Opit,
kohdat 2 (kartta-lukittu-3 kuvat), 4–6 ja -1235:n EHDOTUS/AUKI-listat. PT local_5df52e10-…, JU local_06f8c680-…, NS local_99130238-…, Postivahti local_afae44f0-….
Proto-työkopio /Users/Shared/Claude/wt/proto-natiivi-ui-lahto-vahvistus (natiivi-backup), nyt haaralla natiivi-ui/nahtavyyden-napautus-222 (puhdas).

## TEHTY TÄLLÄ VUOROLLA (kaikki koe, EI JUNAAN ilman PT:n/KK:n sanaa)
1. NÄHTÄVYYDET ENSIN cb3b5537d (natiivi-ui/kartta-lukittu-222): KiinteaLadonta.Vertaa: nähtävyys (r.merkittava) lähitason portaiden alkuun
   (porras min(oma, 5): ennen jokia/kaupunginosia/katuja; kaupungit 0, maakunnat 2, meret 3 yhä ensin). Oma malli: nimetyn 3D-mallin
   jalanjäljessä (maan taso, Este.Pohja) oleva nähtävyys → malli ei ole sen este, ainoa kiinteä paikka mallin kuoren yllä (MalliPaikka=100,
   Rivi.malliSiirtoEm, NimenKohta). `ui kiintealadonta tila` → "oman mallin yllä <nimet> (em)". Testit 6/6, NimiLadonta 43/43, unity 0.
   TODISTE JU:lla: sk-kartta-lukittu-4.txt → lokit/nui-kartta-lukittu-4-cb3b5537d (kl4-p-pohjoisesta, kl4-p-suunta90).
   KATSO: pari vanha = lokit/nui-kartta-lukittu-2-17addbe2d/kl2-p-pohjoisesta.png vs kl4-p-pohjoisesta, rajaus täysresoluutiosta
   (150,500,1000,1150) kuten _tyo/natiivi-ui/kartta-lukittu-2/lahi-invalides-…jpg + koko näkymä; tarkista Musée de l'Armée Invalidesin
   yllä, Palais Bourbon, Petit Palais, Musée Rodin, Saint-Étienne-du-Mont, Saint-Sulpice, kaupungintalo; lokista "oman mallin yllä".
   → pari PT:lle (3 riviä) → KK. Jos Musée de l'Armée ei ole "oman mallin yllä" -listassa: ankkuri ei ole jalanjäljessä (tarkista qid/paikka).
2. FPV-NÄKYMÄ b45bbe356 (natiivi-ui/fpv-nakyma = NS 2efebff6e + 1): UI/Linssit/FpvNakyma.cs + KupoliNimet.Drone-tila (em × 0,15,
   horisontti 0,01…0,06, ankkuri maastossa ×kerroin, korkeus SampleHeightMostDetailed ≤ 64 kerralla, nimi vasta korkeuden jälkeen) +
   Sijaintipallo oikeaan yläkulmaan (54 pt), Kohteeseen(kameran lat/lon) 0,25 s välein. `ui fpvnakyma 1|0|tila|em k|horisontti a b`.
   NS:lle kerrottu 14.3x (koukut, käytä pm-ajossa). Laitteella EI vielä ajettu → katso NS:n pm-kuvat (lokit/natiiviseppa-fpv-pienoismalli*):
   näkyvätkö nimet (Geneve, Chamonix, MONT BLANC…) ja pallo; säädä em-kerroin, jos nimiä liian vähän/paljon. Avoin: vuoret peittävät
   nimet? (ZTest Always: nimi näkyy vuoren läpi; jos häiritsee, korkeusnäyte kameran ja nimen välille).
3. MERENPOHJA c54d3ba0d (natiivi-ui/merenpohja-koe): KohokarttaMaastoOletus = julisteet/maasto/2026-11-08-kohokartta-merenpohja/ (200 OK).
   JU: sk-merenpohja-1.txt → lokit/nui-merenpohja-1-c54d3ba0d (20 kuvaa: 8 paikkaa + pallo, kumpikin 3d ja tasainen samalla kameralla).
   KATSO → parit mp-<paikka>-tasainen | mp-<paikka>-3d (1–5 suunnitelman mukaan + Himalaja/Kuollutmeri/Alankomaat/Kaspia tarkistukset)
   → PT → KK. Tallenne (avaus–kytkin–sulku) puuttuu vielä: tee sk-merenpohja-2 Mac-videona, kun parit ok.
4. NAPAUTUS-2-KORJAUS 491fdf026 (natiivi-ui/nahtavyyden-napautus-222): `ui kohdenostot napauta` → NostotKartalla.NapautaKohde (suoraan
   Napautus(m), loki: mihin Pick osuu + rajat + poiminta). JU: sk-nahtavyysnapautus-2.txt → lokit/nui-nahtavyysnapautus-3-491fdf026.
   KATSO 8 kuvaa + ui-loki "kohdenostot napauta … Pick nostoissa: …" (jos "ei mitään"/"muu": syy oikean sormen kannalta → PT:lle).
   Sitten kuvasarja PT:lle → KK. AVOIN: NS:n vihje NahtavyysEsittely.Hiivuta = k => k.KohdeKiertoHiivu() vaatii NS 79f8a637b:n
   PalloKierto-muutoksen (yhdistä ensin); 3D-mallin kyltti ei esittele (kysymys PT:lle kuvien kanssa).

## JONO NYT
a) JU-ajot jonossa: kartta-lukittu-4 (alkoi 14.2x) → merenpohja-1 → napautus-3. Katso kukin heti kuittauksesta (JU kuittaa NUI:lle).
b) Kosketustikut (PT 13.41): OpasTapit-pohjalta, vasen kaasu (ei palaa keskelle) + yaw, oikea roll/pitch; "FPV-lento" Topografian ☰:hen;
   rajapinta PK:n lentomalliin natiivi-backup pelikoodari/fpv-lentomalli e1d7c09c4 (syöte −1…1, neljä akselia) → sovi PK:n kanssa.
   Pohjaksi natiivi-ui/fpv-nakyma (b45bbe356), samaan FPV-kokonaisuuteen.
c) kartta-lukittu-3 kuvat (luovutus -1322 kohta 2 / PÄIVITYS 13.40).
