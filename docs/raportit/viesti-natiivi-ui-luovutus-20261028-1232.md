# Natiivi-UI: luovutus 28.10.2026 klo 12.32

Edellinen: viesti-natiivi-ui-luovutus-20261027-1555.md. Kaikki sen jälkeiset erät ovat junassa (ks. Tehty).

## Tehty 27.–28.10. (kaikki junassa, ei avoimia)
- Sumennus: 58b8014be + eaa071ffd (UI-merkit 4 pt, Pulu sumenee) → juna 212. PT: 4 pt riittää.
- Maakuntakortin lisenssi kerran: e53794fd9 (UI/Lahderivi.cs + Kartta-testit LahderiviTestit) → juna 213.
- Kartta-kytkimet ja pohjavärit: 44e285d4e → juna 213 runko 0b470602d (NS), web PR 5420 mergetty. Toteutetut omistajan päätökset:
  - 09.29 / KS d89dd614e: Nimet kahtia = Kaupungit ja paikat | Vedet ja vuoret.
  - 10.37: puistojen ja metsien nimet Vedet ja vuoret -kytkimeen, joten kaksi nimikytkintä poistavat kaikki nimet. Puistot ja metsät
    -kytkin vaikuttaa vain alueisiin.
  - 09.45 / 10.23: Linssit, Pelit ja Kartta saavat oman sävyn VAIN otsikkorivin välilehdissä (Linssit.uss POHJAVÄRIT; kuultot
    linssi-hehku-30/40, accent-25/30, videopeli-korostus-32/44).
  - 10.23: suurennuslasi avaa lähizoomilla Kartta-valinnan, mutta vain napautuksesta (IKarttaRyhmat.Lahikartta; testikomento
    `ui kartta lasi`).
- Ison iPadin skenaariot vaakaan (_tyo/natiivi-ui/tietokortti/sk-*.txt: `ui kierto vaaka`).
- Esikatselun opit: batchmode-kartta jää välillä tyhjäksi (latausajoitus). Tarkista md5:llä, että kuvat eroavat, ja anna
  Sonnet-agentin lukea nimiöt ennen KK:lle lähettämistä. Batch latoo nimet 640×480-ruudulle, joten nimiä on vähän; valitse
  näkymä, jossa nimiä on (Walthamstow 51.4950 -0.1300 0.18 toimi). Skenaariot ja ajoskriptit:
  proto-3d/_tyo/natiivi-ui/kartta-kytkimet/ (sk-kartta-nimet.txt, sk-kartta-paneeli.txt, ajo-nimet.zsh).

## KESKEN: kohdekaupunkien nähtävyysnostot striimikartalle (PT 12.4x, vetäjä NUI)
Omistajan pyyntö 12.24: "pystyykö striimikartalle tuomaan kohdekaupunkeihin tehtyjä nähtävyysnostoja?"
OMISTAJAN PÄÄTÖS 12.28 "Kyllä (suositus)": nähtävyydet näkyvät oikeilla paikoillaan, kun lähestyt kaupunkia, ja napautus avaa
jutun.

Tarkennukset (PT):
- Näkyvyys vasta kaupungin lähikartalla, maan tasolla ei (omistaja 2.9.).
- Merkit nykyisillä nostomerkeillä (UI-POHJAT).
- Napautus avaa saman nähtävyysjutun kuin kohdekartalla; kohdekartta ennallaan.
- Merkit samalla zoom-kokosäännöllä ja KS:n porrastuksessa (12.21) kaupungin omat ensin.
- Tavoite: Pariisi lähikartta + napautus -pari KK:lle.

Selvitetty (agentti, juna-213; kaikki polut Assets/Matkakirja/):
- Data: Kohdekartat.Hae(kaupunki, cb) (UI/Kohdekartat.cs:112). KohdekarttaKohde: X/Y kuvaprosentteina, Tyyppi, Aihe, Juttu,
  Nosto. Kaupungilla on Kohteet ja Tarinakohteet. Per-kohde lat/lon:ia natiivissa EI ole.
- Kohdekartta.Paikka(osuus01) (:88) on webin suoraPiste käänteisenä piirtoRajat-alueella. Se antaa saman lat/lon:n, josta X/Y
  laskettiin, paitsi kainalo-kohteille (web karttapiste kainalot) ja laea-kartoille. Aarretehtavakortti.cs:396 käyttää samaa.
- Web: js/packs/maakartat.js KAUPUNKIKARTAT[k].kohteet sisältää lat/lon jokaiselle kohteelle.
- SK teki tarkistetun sijaintitiedoston data/kohdekartat-sijainnit.json (web, PR tulossa; tools/sisalto/kohdesijainnit.mjs):
  - Avain "kaupunki:nimi", lisäksi qid ja P625-lat/lon. Pariisin näyte:
    /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-sisaltokirjuri/b6373f82-8262-46e9-aa64-26df55b70080/scratchpad/paris-sijainnit.json
  - Pariisissa 31 kohdetta, poikkeama kartan pisteestä 1–21 m; Luxembourg 150 m (puiston keskipiste).
  - samaKuin = lähellä olevan wiki-kohteen id.
  - SK:lle on lähetetty myöhempi tarkennus "pelkkä yli 100 m -poikkeamaraportti riittää". Se ehti tehdä koko tiedoston, joka
    on hyödyllinen.
- Kartan nostot: Kartta/NostoKerros.cs (karttavalot.json, katto 120, paakartalla:false ohitetaan :376) ja UI/NostotKartalla.cs.
  - Symbolit tulevat UI/NostoMerkit.cs:stä ja Kartta/NostoSaannot.cs:stä (MiniTunnus, Kuvamerkki).
  - Kokosääntö: min(16/11, 0.7727 × zoomikerroin × oma).
  - Napautus: Napautus(Merkki) :1074 → UiPalvelut.IlmoitaValo → Nostokortti.Avaa(id). Reitit etuliitteillä Nostokortti.AvaaReitti
    :401–430.
  - KaupunginSisainen (NostoSaannot :124) estää kaupungin sisäiset valot, joten kohdekarttakohteet on tarkoituksella pidetty pois
    pääkartalta.
- Jutun avaus: UiNakymat.Hae().Nahtavyydet.AvaaKohde(kartta, kohde) (UI/Nahtavyysarkki.cs:188), valmis reititys
  KaupunkiNosto.Avaa() (UI/KaupunkiNostot.cs:48–59).
- Lähizoom: Sisaltokerrokset.NykyinenTaso + 0.6 ≥ 13 (Kohteet-kerroksen alku), ja Sisaltokerrokset.Paalla(Kohteet) noudattaa
  Kartta-välilehden Kohteet-kytkintä.

Ehdotettu toteutus (ei vielä aloitettu, ei haaraa):
1. UI-puolelle uusi lähde NostotKartalla-piirtoon (tai oma pieni kerros). Kun NykyinenTaso + 0.6 ≥ 13, Kohteet on päällä ja kamera
   on jonkin kohdekartan piirtoRajat-alueen sisällä, merkitään sen kaupungin Kohteet (ja Tarinakohteet) kohtaan
   Paikka(X/100, Y/100).
2. Symboli tulee olemassa olevista nostomerkeistä Aiheen tai Tyypin mukaan, ja kokosääntö on sama.
3. Napautus etuliitteellä "kohde:<kaupunki>:<nimi>" Nostokortti.AvaaReitti-haaraan, joka kutsuu Nahtavyydet.AvaaKohde.
4. Myöhemmin tarkat sijainnit vientiin (kohdekartat-kokoelmaan lat/lon SK:n tiedostosta; skeemamuutos, vientiä hoitava
   rooli/JU). Paikka() riittää v1:een, paitsi kainalot.
5. KS:lta kysytty porrastuksen (12.21) tiedostot ja rajapinta. Vastaus odottaa, joten älä koske ladontaan (Nimikerros,
   NimiLadonta) ennen sitä.
6. Pari: Pariisi lähikartta (esim. komento aja 48.8584 2.3200 0.08 3, odota 50) + napautus Eiffel-torniin → juttu. KK:lle.

## Worktreet
- /Users/Shared/Claude/wt/natiivi-ui-luovutus-20261028 (tämä luovutus): poista mergen jälkeen.
- Ei proto-worktreetä auki.
