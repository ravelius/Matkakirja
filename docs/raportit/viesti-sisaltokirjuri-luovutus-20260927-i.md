# Luovutus: Sisältökirjuri 27.9.2026 klo ~20.3x (kontekstin nollaus, 79 %)

Fable pysäytti tämän session 79 %:n kontekstissa kesken kahden
rinnakkaisen ohjelman (faktatarkistus + maakunta-pulu). Uusi sessio
jatkaa samalla checkoutilla (`/Users/Shared/Claude/Matkakirja-sisaltokirjuri`,
haara `sisalto-pelikatalogi-20260927`).

**TÄRKEIN OPPI TÄLLE SESSIOLLE**: agenttien raportit kirjataan
TIEDOSTOON heti kun ne saapuvat (tehty tässä: molemmat raportit
päivitetty ja pushattu ennen nollausta), ei jätetä odottamaan omaan
kontekstiin — muuten konteksti täyttyy nopeasti kun monta agenttia
raportoi peräkkäin pitkillä viesteillä. Myös: agentti voi itse
käynnistää lisää alaagentteja (nested) ilman erillistä lupaa — varaudu
tähän 3-4 rinnan -rajaa suunnitellessa.

## 1. Lue ensin

1. `CLAUDE.md`
2. `docs/roolitus.md`
3. Tämä raportti kokonaan

## 2. Kaksi rinnakkaista ohjelmaa, molemmat Fablen 27.9. tilauksia

### A) EUROOPAN FAKTATARKISTUS — PR #3473 (draft), erät 1-2 VALMIIT

Raportti: `docs/raportit/sisaltokirjuri-faktatarkistus-eurooppa-20260927.md`
(täydet perustelut/lähteet/EPÄSELVÄ-kohdat kaikille 17 korjaukselle).

**Erä 1 (Pariisi/Lontoo/Rooma/Berliini) + erä 2 (Wien/Madrid/Ateena):
17 vahvistettua virhettä korjattu ja pushattu.** Rooma: 0 virhettä.

**HUOM TÄRKEÄ: koko testisarjaa ei ole ajettu näiden viimeisimpien
4 korjauksen (Madrid×2, Wien, Ateena) jälkeen.** Aiempi täysi ajo
(13 korjauksen jälkeen) antoi 4479/4498 pass, **1 FAIL** — epäselvää
mikä testi, output-tiedosto rotatoitui eikä "not ok" -riviä jäänyt
talteen. ENSIMMÄINEN TEHTÄVÄ: `cd wt/sisaltokirjuri-faktatarkistus-e1
&& node --test tests/*.test.mjs` kokonaan, selvitä ja korjaa
epäonnistuva testi, sitten poista PR:n draft-tila.

**Avoin, ei korjattu**: Ateenan Akropoliin korkeus vaihtelee
tiedostoittain (150m kulttuuri-kategoriat.js+nahtavyysjutut.js vs.
156m+"90m tasangon yli" maakartat.js — jälkimmäiselle ei lähdetukea).
`maakartat.js` on Karttasepän vastuualuetta — kysy Fablelta kuka
korjaa, tai korjaa itse jos Fable antaa luvan.

**SEURAAVAKSI (erä 3)**: Istanbul (ei aloitettu ollenkaan). Sen
jälkeen Fable ei ole nimennyt seuraavia kaupunkeja — luonnollinen
jatko olisi Eurooppa-erien 7-9 kaupungit (Tukholma, Bukarest, Pietari,
Lissabon, Sofia, Ateena[tehty], Istanbul, Helsinki, Madrid[tehty]),
koska niissä on tuoretta sisältöä jota ei ole vielä faktatarkistettu.

Menetelmä joka toimi hyvin: yksi WebSearch-tutkimusagentti (general-
purpose, Sonnet) per kaupunki, lukee kaikki 3-4 tiedostoa
(kulttuuri-kategoriat.js + nahtavyysjutut.js + maakartat.js +
fokusvirta-<kaupunki>.js jos on) kokonaan, raportoi Tiedosto:rivi/
Väite/Lähde/Havainto/Ehdotettu korjaus -muodossa. Korjaukset
sovelletaan MANUAALISESTI raportin jälkeen (ei anneta agentin
editoida — laadunvarmistus). Isot kaupungit (Ateena, Wien) hyötyvät
siitä että agentti jakaa itse työn 2-4 alaagenttiin — anna sen
tapahtua, mutta muista tarkistaa duplikaatit
(karsitut-nostot/fokusvirta-kopiot) kun sovellat korjauksia.

### B) MAAKUNTIEN PULU (Livian kysymykset) — PR #3472, erä 1 VALMIS

**NLD (15 aluetta) + CHE (26 kantonia) = 41 aluetta, 90 paria,
VALMIS ja pushattu.** `tests/maakunnat-pulu.test.mjs`: 2/2 pass.
**HUOM: koko testisarjaa ei ehditty ajaa** — sama tarkistuspyyntö
kuin faktatarkistus-PR:lle, tee tämä ennen draft-tilan poistoa.

**PULU-JONO (Fablen prioriteettijärjestys, jäljellä)**: CZE, HUN,
PRT, SWE, NOR, DNK, FIN, IRL, BEL, HRV, sitten loput 21 Euroopan
maata (ROU/LUX/MLT/BGR/MNE/SRB/BIH/MKD/ALB/CYP/MDA/UKR/BLR/ISL +
TUR/RUS Euroopan osat).

**PITKÄ-LUONNEHDINNAT (erillinen, pienempi puute)**: vain CZE ja HRV
puuttuvat prioriteettilistalta (kuva jo olemassa, vain pitkä-teksti
puuttuu) + 14 muuta maata kokonaan (ROU/LUX/MLT/BGR/MNE/SRB/BIH/MKD/
ALB/CYP/MDA/UKR/BLR/ISL). CYP puuttuu myös kuva-kenttä.

**RENDERÖINTI VAHVISTETTU MOLEMMILLA ALUSTOILLA** (kohta 3 Fablen
tilauksesta) — ei enää tarkistettavaa. Web: js/karttatyokalu-
maakunnat.js. Natiivi: Natiivi-UI vahvisti kuvakaappauksella.

**Työtila**: `/Users/Shared/Claude/wt/sisaltokirjuri-maakunta-pulu-e1`
— käytä samaa jatkaessasi (esim. CZE seuraavana), tai luo uusi jos
worktree on jo poistettu/mergetty.

## 3. Aiemmin tässä sessiossa valmistunut (ei enää jonossa)

- Codex-tyyliuudistus, Ateena PR #3428: hyväksytty, kuitattu.
- PR #3444/#3447/#3449/#3459/#3465 — kaikki MERGETTY Julkaisijan
  junoissa.
- Levyhälytys: worktreet siivottu useaan kertaan, tilanne ok
  nollaushetkellä.
- 23 puuttuvan karttanoston miniatyyrin tilaus lähetetty Codexille
  postilaatikon kautta (posti/sisaltokirjuri-kuvaputki-23-puuttuvaa-
  karttanostoa-20260927.md) — ei omaa jonokohtaa, odottaa Codexin
  toimitusta.

## 4. Sitovat käytännöt (ei muutoksia)

- JUMI → FABLE, VIESTIRAJA ~10/vuoro, kohderyhmä 13+.
- Agentit vain Sonnet/Opus, enintään 3-4 rinnan (huomioi nested-
  agentit, ks. yllä).
- VAIN EUROOPPA on maantieteellinen rajaus.
- Main liikkuu nopeasti: fetch+rebase juuri ennen pushia.
- Älä mergaa checkout-haaraa `sisalto-pelikatalogi-20260927`.
