# Sacré-Cœurin kivetty aukio — #1976

Lähde `posti/karttaseppa-codex-sacre-coeur-aukio-20261104.md`, commit `5d8333c90a87389722dd09225a76296624dc7e32`, blob `f1117bdc6611687308f5c21185ec06780cd75b9b`. TILAUS.md luettu kokonaan ja kaikki 9 manifestitiedostoa SHA256-varmennettu. **1 ImageGen-kutsu / 1 uusi kuva.** Erillinen aukio; hyväksyttyä kirkkoa ei tuotettu uudelleen.

`aukio-sacre-coeur.png`: **1536 × 1024 RGBA**, natiivigeneroinnin tavut säilytetty muuttamatta. SHA256 `dd74330a28adb36152135d306cf7e7391ca7ddcb15aafd422cde94032a7b16b4`. Ei skaalausta, leikkausta tai alfa-/värikorjausta.

## Ääriviiva ja istutukset

Näkyvän alueen rajat (alpha ≥128): **x581–954, y864–940**, molemmat päätepikselit mukana. Puoliavoimina rajoina [581,864,955,941], koko **374 × 77 px**, keskiakseli **x768**. Tavoite [614,858,922,933], 308 × 75 px ±5 %.

**Istutuksia 6.** Matalat soikeat istutusalueet kivireunuksin, tumma oliivinvärinen matala kasvusto. Ei pensaspalloja. Keskipisteet likimäärin (639,881), (762,882), (893,883), (686,906), (767,919), (850,907).

Kiveyksen ohuet viivat näkyvät koko alalla. Etureuna on loiva kaari, sivut kaartuvat elävästi; takareuna on lähes suora. Ei kirkkoa, portaita, nurmea, puita, katuja, taloja, ihmisiä tai tekstiä. Reunassa ohut kivireunus, ei porrastusta. Lämmin vaalea kivipaletti ja matala yläviisto näkymä.

## QA-poikkeamat

- **Leveys on 374 px eli 21,4 % yli tavoitteen**, joten ±5 % ei täyty. Korkeus 77 px on toleranssissa (+2,7 %). Keskiakseli täsmää. Takareuna on 6 px ja etureuna 8 px tavoiterajoja alempana. Alkuperäistä ei sovitettu jälkikäteen.
- Alfa min/max 0/254. Täysin läpinäkyviä pikseleitä 1545433, osittaisia 27431, täysin alpha255-pikseleitä 0. Näkyvän rajauksen +2 px ulkopuolella on **740 erittäin matala-alfasta pikseliä, alpha enintään5**. Tiukka alpha0-tausta / ei haloa -ehto ei täyty, vaikka sinisellä QA-taustalla hajaa ei juuri erota.
- Rajat eri alfakynnyksillä (oikea/alareuna poissulkeva): alpha≥1 [17, 53, 1508, 945]; ≥16 [580, 863, 956, 942]; ≥128 [581, 864, 955, 941]; ≥250 [582, 864, 954, 940].

**Oma kokonais-QA: EI LÄPÄISSYT, koko- ja tausta-alfapoikkeamat yllä.** Tämä on lähteen yhden oton mukainen arviointitoimitus. Karttasepän hyväksyntää, mahdollista koodisovitusta, runtime-integraatiota tai julkaisua ei väitetä valmiiksi.

Täysi kehote, alkuperäinen ja QA-kuvat: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-nahtavyydet-1955-1964-20261103/sacre-coeur-aukio`. Menetelmä: sovelluksen sisäinen ImageGen; Python vain tavujen kopiointiin ja QA-mittauksiin/taustayhdistelmiin.
