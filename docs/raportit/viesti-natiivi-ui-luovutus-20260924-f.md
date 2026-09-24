# Natiivi-UI:n luovutus 24.9.2026 (f)

Jatkaa luovutusta `viesti-natiivi-ui-luovutus-20260924-e.md`. Proto-git on `/Users/Shared/Claude/proto-3d/Matkakirja-proto`,
ja Natiiviseppä mergeää ja tekee `.meta`t. Käännöstarkistus: `./Peli-testit/unity-tarkistus.sh` ja `python3 tyokalut/uss-tarkistus.py`.

## Master (333d3f0) sisältää tämän session erät

sisallys, korttiauki, anfangit, lehti-turva, paikkakupla, iphone-yla, nostomerkit 5b75610 (kartuscha, kertojan laatikko,
selite, linssin vaihdon porrastus, nostomerkit + ryhmitys + viuhka, merkit aina, portin verho, Aloitusnakyma.PorttiMuuttui).

## Merge-pyyntö (Natiivisepän seuraava sessio): natiivi-ui/nostomerkit e16d1e6

Worktree `/Users/Shared/Claude/wt/proto-natiivi-ui-nostomerkit`, master mergetty, unity-tarkistus 0. Uudet commitit masterin päälle:
- 8d554a8 skeema 2.0 -lukijat (LehtiSisalto päätason aiheet + kansi, PuluHaku nähtävyydet päätasolta)
- 33a8e7e pulun chat: SSE-striimi (DownloadHandlerScript, 90 s), katkennut virta → kertynyt + "Ajatus katkesi…", 403 tavallinen virhe
- ad20fa0 pöllön kehittäjäkoodi vain Keychainiin (Asetukset.PolloKoodi, tallennus kehittäjätilan kytkennässä; App Store null)
- e16d1e6 Liiku väistyy maan kortin tieltä napin tasolla (inline-opacity ohitti luokan)

## Build 5 -löydökset (Fable) — tila

| # | Löydös | Tila |
|---|---|---|
| 1 (build 6) | nostomerkit eivät näy | piirto masterissa (NostotKartalla.cs, kerros 12); simulaattorissa Ateenassa ei näy, koska kamera on liian kaukana (NostoKerros.Nakyvissa vaatii osuuden ≥ 0,5) → Natiivisepän saapumiszoomi |
| 3 | paikkakupla + latausrivi päällekkäin | ✓ masterissa |
| 5–7 | iPhonen yläosa, Liiku, laukku ilman linssejä | ✓ masterissa, kuvattu (natiivi-b6-*-iphone.jpg); inventaarioon merkittävä hyväksytty poikkeama (iPhone) — TEKEMÄTTÄ |
| 8–10 | maapaneeli webin mukaan | ✓ masterissa; Liiku-väistön korjaus e16d1e6 jonossa |
| 11 | kertojan laatikko sana per rivi | ✓ masterissa (ei vielä kuvattu jaksosta 295 589) |
| 12 | "Afrikasta." erillään | ei vika: oma virke datassa, avaus virke kerrallaan kuten webissä |
| 15 | selite kuplan/lasien alla | ✓ masterissa, kuvattu |
| 16 | chat 403 | juurisyy worker-allowlist (bundle fi.matkakirja.peli) → PR #3046 (Julkaisija); natiivin striimi jonossa (33a8e7e) |
| 17 | aloitusportin pallo | verho ✓; sumennus: kytke UiNakymatissa `Aloitusnakyma.PorttiMuuttui += a => PalloKierto.PorttiSumea = a;` kun Natiiviseppä on lisännyt staattisen (ei vielä olemassa → ei käänny ennen sitä) |

## Kesken

1. PorttiSumea-kytkentä (yllä).
2. Inventaario: iPhonen yläosa/laukun linssit hyväksytyiksi poikkeamiksi (`nappi-inventaario-natiivi-20260923.md`).
3. Laitetestaajalle uusinnat: matkakirjakortti-kiinni (iPhone), linssi-selite; maatiedot odottaa Pelikoodarin työkalua.
4. Chat laitteella, kun #3046 julkaistu (testi kuluttaa omistajan 30/vrk-kiintiötä, käytä kehittäjäkoodia).
5. Piikit: keksintöjen loppu 42 ms (muotokuvien täysikokoinen upload testinäkymässä). Linssisepän ajo 4 (63a2852,
   proto-3d/lokit/linssit-piikit-20260924/ajo4/konsoli.txt, framet 29002–30247): RADIO SOIDESSA 9 piikkiä 23–33 ms,
   joka kerta UIElementsRepaintPanels / kerros 25 PrepareRepaint 14–15 ms (RenderTree.UpdateVisuals, ConvertMesh 4 ms)
   → radiopaneeli piirtyy uudelleen soiton aikana (asteikon/VU-animaatio? generateVisualContent tai MarkDirtyRepaint
   joka kehys) — etsi RadioNakyma.cs:stä ja rajaa uudelleenpiirto; avaus 32 ms (repaint 17). Keksintöjen avaus Vaihtui 7,3 ms.
   Maalehti ja vertailu puhtaita.
6. Nostomerkkien symbolit: luonnon kuva valitaan aiheen ensimmäisestä (vuori), koska karttavaloissa ei ole lajia (webin maastokohteet eivät ryhmity; natiivissa ryhmittyvät).
7. Linssin selite ja keksintöjen karuselli-kuvat eivät ole vielä pariteettikuvina uudella buildilla.

## Opit

- macOS ei erota kirjainkokoa: `Nostomerkit.cs` = `NostoMerkit.cs` → uusi luokka NostotKartalla.cs.
- Rakenne.Nayta asettaa inline-opacityn; väistöluokka lapselle, ei kääreelle.
- Webin mitat saa selainpaneelista 393 × 852 (`?lauta=pallo&dev=ateena&koe=suoraan`, getComputedStyle).
- Sisalto.HaePaketista luki välimuistin pääsäikeessä (Natiiviseppä korjasi 5a5c6e2) — lehden/chatin piikit.
- kuvaa2.sh (proto-3d/lokit/pariteetti-20260924/) ajaa ui:/peli:/linssi:/odota:-askeleet; mykistä Mac ennen ja palauta jälkeen.
