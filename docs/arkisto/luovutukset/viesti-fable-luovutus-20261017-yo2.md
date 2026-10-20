# Päätoimittajan luovutus 17.10.2026 klo 01.3x (konteksti 29 %; tili vvi@vvi.fi)

PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589. Id:t /Users/Shared/Claude/osoitekirja.md. Asemataulu https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm; paikallinen talo/junat.json ja tyolista.json ajan tasalla 01.3x.
Edellinen luovutus: viesti-fable-luovutus-20261017-yo.md (#4749). KELLO AINA `date +%H.%M`.

## 0. Heti aluksi
RC päälle, odottajavahti-Monitor (30 min, uudelleen joka vanhenemisella), get_usage self.

## 1. OMISTAJA NUKKUU — YÖN VALTUUTUS (01.03, sanatarkasti)
"Menen nukkumaan. Hyväksy kaikki puolestani ja yritä saada kaikki joko ensimmäiseen tai viimeistään toiseen junaan ja julkaise ne"
= OMISTAJA PYYSI JULKAISUA junille 197 ja 198. KK hyväksyy esikatselut puolesta (ei kortteja); PT päättää muun oletuksella ja kokoaa aamun kysymykset KK:lle. Kesken jäävä erä ei pidätä 198:aa vaan siirtyy seuraavaan. Muistiajo ohitetaan (Raamattu: Ei testejä junaan).

## 2. JUNA 197 — LUKITTU 01.3x
Runko natiiviseppa/juna-197 fd8e3f769 (vihreä; käännös 65f8af40c = sama koodi). Sisältö: NUI museo-kortit d9d25aee4 + lukijan valinnat pois, PK 8e00df046 + cd5d79c32 (intro, museon kamera, suorakulmainen kehys; iPad-pysty todistettu), SS AaniPohja 9db0288e9, Louvre-osoitin v6k22 (CDN ✓). Muutosloki #4761 (M c6bcb6bc4) kuitattu.
SEURAAVA: NS:n lukituskäännös L2:lla (KS:n jälkeen) → JU tf-kaynnista.sh 197 → TF-rivit PT → KK. Asemataulun Juna 197 -rivillä "Tarkistetaan TF-listasta" -osio: siivoa TF-rivien mukaan (siirrä puuttuvat 198:aan).

## 3. JUNA 198 — runko NS:ltä fd8e3f769:stä (EI 4b6ef2395)
Valmiina koodissa, odottaa käännöstä/simua (JU:n L2-järjestys: KS vihjeet → LS vapaalento 9096ff5d2 → PK raketti 160db49aa (kärki, AaniPohjan päällä) → muut):
- KS varjo + pienoismallit b6c4b3025 (käännetty, iPad-lähikuva → KK); KS iss-reitti-198 aeb76a609 (reittiviiva + harmaa laatikko pois) + iss-rajat-197 2d0957ef6.
- KS skannerin korkokuva 158e90cd9 (+1 025 kohdetta, testi 1 131/1 131) + NUI piirto 5c2cb709b (kuvapari Kiova/Marseille/Bergen → omistajalle ennen kytkentää).
- NUI: museo-kevyt a7327efa2 (☰ pois, kevyet ympyrät, nimen rivitys); iss-luettelo + Cupolan nimet e208d45fe; kamerapöytä 1ff45e88e (Kaytossa=false, kuvat omistajalle ennen kytkentää); Cupolan Ohita b38e4dbb4 → PT pyysi siirtämään napin pois Pulun päältä + still → KK. Web #4750 ("yöllä" pois) ja #4762 (käärö-tyylikirja) → JU mergeää vihreinä.
- PK: A vieritys 0c728d724 (+ testi, muuttaa NS:n Ruudunpaivitys.cs/KuvataajuusPaatos.cs), B lukija sanoo nimen bfc26ed3f → yhteiskäännös iss-ab-198 d58c50517; C intron nykäysten mittaus juna 197 -appilla (simujono).
- Valoseppä: Linnunrata 4ca02d476 (käännös + 8 suunnan simu jonossa) → pari PT → KK. Valas k3 + pyramidi k62 jonossa.
- LS: vapaalento-197 korjaus 9096ff5d2 (opaslinssi kaatui) → simu → NS 198:aan.
- SS: aanivahti fdfb5f6dd + luentamanifesti v2 (pyydetty) → NS 198. Siirtolista 32 → 23 jatkuu (siirto-198-1 56e469f33).
- Äänittäjä: luennat erä 1 museo ämpärissä (453 kpl, 13 048 kr); erät 2–3 käynnissä; natiivin vienti `ui nostoluennat kaikki europe` JU:n vuorolla 197:n jälkeen. Omistajan päätös 00.57: kaikki Euroopan luennat, ≤ 1 505 kpl / ~141 700 kr; muu maailma myöhemmin.

## 4. KIINAN DYNASTIAT (omistaja 01.25, loki #4760)
Tehdään valmiiksi KK:n referenssien pohjalta. KS data 1747bf0c8 (kerrokset; LS kuittaa muodon → PR). LS piirto (muste, liike, jälki, Minard-nuolet) + sinetti iss-sinetti-pohjalla. NUI KEHYS-KÄÄRÖ 9365854c2 (KK:n yöpäätös; jos ei läpäise, lasipohja). SK tekstit: 19 avainvuotta, 5 taistelua (KS:n valinta: Changping, Fei-joki, Punainen kallio, Yamen, Shanhain sola), keksinnöt, Zheng He, Marco Polo.

## 5. TUOTANTOPOHJAT (omistaja 23.38) — 6/7 luonnoksena
kertojan-teksti-ja-aani, paakaupungin-avaus (#4752/#4753), taidemuseon-maa (#4754), kuumailmapallokierros (#4755/#4756), historiapeli (#4757/#4758), 3d-maamerkki (#4759). Puuttuu: uusi linssi → LS vapaalennon ja Kiinan jälkeen. TÄYDENTÄÄ-otsikot rooleille myöhemmin. Lisää pohjat Raamatun dokumenttikarttaan junien jälkeen.

## 6. MUUT
- tarkista.sh-tila 644 toistui (NS 4d210f6d6, korjattu 04174fdc5); JU ajaa nyt zsh:lla. Muisti tiedostomuokkaus-valiaikaisen-kautta.
- Levy 39–40 Gi (roolit siivosivat). JU:n levyvahti: < 22 Gi → L2 seis.
- Nollattu yöllä: KK 00.38, JU, PK, VS, KS, SiirtoS, NUI. ÄÄ 35 % kova raja 01.22 (luovutus puuttui 01.26). KK 35 %: aloitus.md päivitettävä; KK nollataan vain omistajan kortilla.
- Aamun kysymykset KK:lle: kamerapöydän ja skannerin kuvat omistajalle ennen kytkentää; käärön kuvapari; Kiinan 5 taistelun valinta tiedoksi.
