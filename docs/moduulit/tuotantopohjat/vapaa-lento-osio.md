# Tuotantopohja: vapaan lennon osio

*(LUONNOS 17.10.2026, Pelikoodari, PT:n toimeksianto: tehdään yhdessä Linnanrakentajan kanssa. Raamattu, TUOTANTOPOHJAT. Tähän
on koottu Tivolin vapaan lennon (omistaja 17.10. klo 09.59, `docs/raportit/tivoli-suunnitelma-20261017.md` luku 6) toteutus
ja opit; uusia sääntöjä ei ole. Jos tämä ja Raamattu ovat ristiriidassa, Raamattu voittaa. Pelikoodari omistaa logiikan ja datan
osuuden; mallit, liikkuvat osat ja leikkaus täydentyvät otsikolla "TÄYDENTÄÄ: Linnanrakentaja", valo ja äänet omilla
otsikoillaan. PT hyväksyy muutokset. Ei vielä dokumenttikartalla.)*

Vapaan lennon osio = pallokierroksen pysäkki, jonka kerronnan jälkeen pallo ei nouse seuraavalle pysäkille vaan laskeutuu
matalalle, ja pelaaja lentää vapaasti rajatun kohteen (puisto, aukio, linnoitus) yllä. Lähelle lentäessä kertoja kertoo
kohteesta yhden lyhyen tarinan. "Jatka kierrosta" nostaa pallon takaisin kierrokselle. Pohja ei kata kierroksen jälkeistä
yleistä vapaata lentoa (se on ennallaan) eikä 3D-mallien tekoa (`3d-maamerkki.md`).

## 1. Tuotantoputki ja roolit

| Vaihe | Rooli | Tulos |
|---|---|---|
| 0. Päätös | PT (omistaja) | Kohde, pysäkki ja kokemus lokissa (Tivoli: omistaja 09.59) |
| 1. Rajat ja kohteet | Linnanrakentaja + Karttaseppä | Laatikko (OSM-raja + reunat), kohteiden keskipisteet ja säteet (leikkausrenkaista) |
| 2. Lähitarinat | Sisältökirjuri | `docs/kohtaukset/pallokierros/<kohde>-lahitarinat-<pvm>.json`, riippumaton tarkistus |
| 3. Data ja logiikka | Pelikoodari | `Resources/Opas/osio-<id>.json`, testit, kuvapari PT:lle Googlen laatoilla |
| 4. Äänet | Äänittäjä (omistajan hyväksymät tekstit) | `aani`-kenttä tarinaan; ilman ääntä teksti näkyy chatissa |
| 5. Omat mallit | Linnanrakentaja / Codex | Liikkuvat osat ja leikkaus (`3d-maamerkki.md`); osio toimii jo ilman niitä |
| 6. Juna | Natiiviseppä | Vasta PT:n kuittaaman kuvaparin jälkeen |

## 2. Kultainen polku

1. **Tee ensin Googlen laatoilla.** Osio ei odota omia malleja (PT 17.10.): laskeutuminen, rajat ja tarinat todennetaan
   laatoilla, ja mallit vaihtuvat myöhemmin saman datan alle.
2. **Yksi datatiedosto per osio**, ei koodimuutosta: `Assets/Matkakirja/Linssit/Resources/Opas/osio-<id>.json` ja tunnus
   listaan `OpasSovitin.Osio.cs` → `OsioTunnukset`. Osio sidotaan kaupunkiin ja pysäkin Wikidata-tunnukseen.
3. **Laskeutuminen:** piste, korkeus pinnasta ja kesto; katse kohti nimettyä kohdetta (`katse_kohde`) tai suunta asteina.
   Tivoli: järven pohjoisranta, 30 m, 4 s, katse 203° Himmelskibetiin.
4. **Rajat:** korkeus pinnasta (Tivoli 6–120 m), nopeus (2–14 m/s; nopeusvipu ei vie rajojen yli), törmäyskehät
   (8 m pysähdys, 20 m nousu ja jarrutus) ja laatikko, jonka reunan yli liike hiipuu `palautus_m`-matkalla (40 m) ja josta
   kamera palaa jousella reunalle. Välys rakennuksiin ja puihin = alin korkeus (kaupungissa 12 m).
5. **Lähitarinat:** kohteen reunasta (keskipiste − `r_m`) alle `lahisade_m`:n (35 m) → tarina kerran käynnillä, vain kun
   kertoja on vapaa (kaukana kuultu tarina ei jää jonoon). Pitkänomaiselle kohteelle `r_m` = lyhyempi puoliakseli.
6. **Poistuminen:** Jatka kierrosta on näkyvissä laskeutumisen jälkeen. Pysäkin kehys siirtyy pelaajan paikalle, ja
   kierroksen loppu (lopetusnousu ja loppusanat) lähtee sieltä. Pelaajan muu valinta (Liiku, toive, ■, etsintä) päättää
   osion, ja kaupungin vapaa lento jatkuu ilman osion rajoja.
7. **Käytä olemassa olevia pohjia.** Lento on `OpasVapaaLento` osion rajoilla, nappi on OpasValikon Jatka kierrosta
   -rivi, liikkeet liikepohjalla (`Liikepohja.Jousi`, liikevahti). Uutta UI:ta ei tehdä (UI-POHJAT).

## 3. Datan kentät (`osio-<id>.json`)

| Kenttä | Merkitys |
|---|---|
| `id`, `kaupunki`, `pysakki` | Osion tunnus, kaupunkitilan id ja pysäkin Wikidata-tunnus (pakolliset) |
| `laskeutuminen` | `lat`, `lon`, `korkeus_m`, `kesto_s`, `katse_kohde` tai `suunta` |
| `korkeus_m`, `nopeus_ms`, `kehat_m` | Parit [min, max]; kehät [pysähdys, nousu] |
| `laatikko`, `palautus_m` | `lat` [min, max], `lon` [min, max]; pehmeän palautuksen matka (m) |
| `lahisade_m`, `kohteet` | Laukaisumatka reunasta; kohteet `id`, `nimi`, `lat`, `lon`, `r_m`, `tarina` |
| `tarina` | `tunnus`, `kertoja`, `otsikko`, `teksti`, `puhuttu`, `aani` (null, kunnes äänitetty) |

## 4. Valmiin määritelmä

- [ ] `Linssit-testit`: `sh kaanna.sh VapaaLentoOsio` läpi (data, laskeutuminen, rajat, laatikko, tarinat, Jatka kierrosta).
- [ ] `zsh tyokalut/tarkista.sh` paluukoodi 0 (Unity, liikevahti, kielivahti).
- [ ] Simu: kierros pysäkille (`opas hyppy <Q>`), laskeutuminen, lento laatikon reunalle ja yli, lähitarina, `opas jatka`
      → loppu; kuvapari (laskeutumisen jälkeen ja lennosta) PT:lle. Loki: "opas: osio <id>: …".
- [ ] Kaikki kohteet ja laskeutumispiste laatikon sisällä; laskeutumisen silmän nopeus tarkistettu videosta.

## TÄYDENTÄÄ: Linnanrakentaja

*(Omat mallit osion alle: liikkuvien osien solmut, leikkaus, laatikon mitoitus OSM-rajasta, kolmiobudjetti.)*

## Opit (Tivoli 17.10.2026)

- Kaupungin vapaan lennon raja-arvot (alin 15 m, välys 12 m, luotaimen pysähdys 120 m) estävät puistolennon: osio tuo
  omat arvonsa, ja kaupunki pysyy ennallaan (`OpasVapaaLento.Osio`).
- Jatka kierrosta ei saa nollata pysäkin kerronnan tilaa, koska kierroksen loppu odottaa sitä; osio päättyy ennen sitä.
- Paluu vanhaan pysäkkikehykseen olisi lentänyt satoja metrejä 3 s:ssa; kehys pelaajan paikalle ja loppunousu sieltä.
