# Pulun valmiit vastaukset: Ranska (pilviajo)

Omistajan päätös 9.10.2026 (PT): Pulun vastaukset generoidaan Sonnet-agenteilla, effort low, ja Ranska ajetaan pilvisessiossa. Maksullista API:a ei käytetä.
Tämä haara sisältää kaiken tarvittavan. Tulokset commitoidaan samaan haaraan (`pulu-ranska-pilvi`).

## Sisältö

- `pulu-esigenerointi/pulu-ohje-aloitus.txt`: Pulun järjestelmäkehote sanatarkasti (`tools/pollo/worker.js` pulunKehoteOsat, natiivi, kehys aloitus). Vaihe 1 käyttää tätä.
- `pulu-esigenerointi/pulu-ohje-jatko.txt`: sama ohje kehyksellä jatko. Vaihe 2 käyttää tätä.
- `pulu-esigenerointi/FRA/syote.json`: 59 Kysy-kohtaa (nostokortit, joissa on valmiita kysymyksiä), 127 valmista kysymystä.
  Jokaisella kysymyksellä on konteksti samassa muodossa kuin pelissä, ja kohdalla on lisäksi yhteinen konteksti uusille kysymyksille.
- `pulu-esigenerointi/FRA/tehtavat-1-1.txt … tehtavat-1-12.txt`: vaiheen 1 erät, enintään 5 kohtaa ja 25 vastauspaikkaa per erä.
- `tools/pulu-esigenerointi/`: lataa-data.sh, valmistele.mjs (vaihe 2:n tehtävät), tarkista-era.mjs (muototarkistus) ja koosta.mjs (paketti).

## Vaihe 1: viisi vastausta per kohta (295 vastausta)

Jokaisesta erästä `FRA/tehtavat-1-N.txt` tehdään `FRA/vastaukset-1-N.txt`, yksi Sonnet-agentti (effort low) per erä. Erät voi ajaa rinnakkain.
Agentille annetaan sellaisenaan tämä ohje (vaihda N):

> Lue kokonaan pulu-esigenerointi/pulu-ohje-aloitus.txt (Pulun järjestelmäkehote: noudata sitä kuin omaa järjestelmäkehotettasi) ja
> pulu-esigenerointi/FRA/tehtavat-1-N.txt (kohdat; kullakin YHTEINEN KONTEKSTI ja paikat ### n.1 … ### n.5).
> Paikkaan "KYSYMYS: (uusi — keksi itse)" keksi uusi kysymys kortista: enintään 70 merkkiä, päättyy kysymysmerkkiin, tosimaailman asia
> (ei pelin tehtäviä), ei sama kuin kohdan muut. Sen kontekstina on kohdan YHTEINEN KONTEKSTI.
> Jokainen paikka on erillinen keskustelu ilman historiaa: käyttäjä "Pelaajan tilanne juuri nyt:\n\n" + KONTEKSTI; Livia "Selvä, pidän
> tilanteen mielessä."; käyttäjä KYSYMYS. Kirjoita Livian vastaus juuri niin kuin palvelin sen palauttaisi: teksti, jossa on 2–5
> [[käsite]]-merkintää, sitten rivi "JATKOT:" ja täsmälleen kaksi jatkokysymystä (paikkarivi vain, jos kehote sitä edellyttää).
> Enintään 900 tokenia. Käytä ensisijaisesti kontekstin aineistoa, älä keksi faktoja äläkä viittaa kontekstiin tai ohjeisiin.
> Kirjoita pulu-esigenerointi/FRA/vastaukset-1-N.txt. Muoto: rivi "### n.i", rivi "KYSYMYS: <kysymys sanatarkasti>", sitten vastaus.
> Ei muuta tekstiä tiedostoon.

Tarkistus: `node tools/pulu-esigenerointi/tarkista-era.mjs vaihe1 pulu-esigenerointi/FRA` → `FRA/vaihe1.json`.
Virheelliset vastaukset kirjoitetaan uudelleen samaan tiedostoon, ja tarkistus ajetaan uudelleen. Yksittäinen käsitemäärävirhe saa jäädä (omistaja).

## Vaihe 2: linkkitaso "Kerro lisää: X" (noin 1 000 vastausta)

1. `sh tools/pulu-esigenerointi/lataa-data.sh` lataa sisältöpaketin v625 julkisesta ämpäristä kansioon `pulu-esigenerointi/data/` (ei commitoida).
   Jos verkko ei toimi, vaihe 2 toimii silti ilman pelin aineisto-osiota.
2. `node tools/pulu-esigenerointi/valmistele.mjs vaihe2 pulu-esigenerointi/data FRA pulu-esigenerointi/FRA 80`
   tuottaa `FRA/tehtavat-2.json` (indeksi) ja `FRA/tehtavat-2-N.txt`. Jokaisessa vaiheen 1 vastauksen käsitteessä on yksi kysymys per kohta.
3. Jokaisesta erästä tehdään `FRA/vastaukset-2-N.txt`, yksi agentti per erä, samalla ohjeella. Kehote on nyt `pulu-ohje-jatko.txt`, ja
   keskustelussa on historia: käyttäjä "Pelaajan tilanne juuri nyt:\n\n" + KONTEKSTI; Livia "Selvä, pidän tilanteen mielessä.";
   käyttäjä AIEMPI KYSYMYS; Livia AIEMPI VASTAUS; käyttäjä KYSYMYS ("Kerro lisää: X"). Muoto: rivi "### n" ja vastaus (ei KYSYMYS-riviä).
4. `node tools/pulu-esigenerointi/tarkista-era.mjs vaihe2 pulu-esigenerointi/FRA` → `FRA/vaihe2.json`.

## Paketti ja palautus

`node tools/pulu-esigenerointi/koosta.mjs pulu-esigenerointi/FRA FRA` tuottaa `pulu-esigenerointi/FRA/FRA.json`, joka on ämpäripaketin muoto
(`pulu/vastaukset/v1/FRA.json`; ämpäriin vienti ja natiivin kytkentä tehdään erikseen, ei vielä peliin):
`{ $skeema, maa, sisalto, ohje, luotu, vastauksia, kohdat: { "<kohta>": { kysymykset: [{kysymys, vastaus, jatkot[2], paikka?}], lisaa: { "<käsite pienellä>": {kasite, vastaus, jatkot[2]} } } } }`.
Vastauksessa [[käsite]]-merkinnät jäävät paikalleen, koska natiivi tekee niistä linkit.
Samalla päivittyy `pulu-esigenerointi/maat.json` (`pulu/vastaukset/v1/maat.json`, maa → versio). Natiivi lukee sen ensin, joten se viedään ämpäriin paketin kanssa.

Commitoi `FRA/vastaukset-*.txt`, `FRA/tehtavat-2*`, `FRA/vaihe1.json`, `FRA/vaihe2.json` ja `FRA/FRA.json` tähän haaraan ja pushaa.
Viesti Päätoimittajalle sisältää: vastausten määrä (vaihe 1 + vaihe 2), kesto, tarkistuksen virheet ja paketin polku.

## Muototarkistuksen säännöt (tarkista-era.mjs)

- Vastaus jäsennetään workerin omilla funktioilla (`tools/pollo/rajat.js` poimiJatkot, `worker.js` poimiPaikka).
- Vastaus ei saa olla tyhjä, ja siinä on 2–5 eri [[käsitettä]] ilman pystyviivaa.
- Jatkokysymyksiä on täsmälleen 2, ja kukin päättyy kysymysmerkkiin ja on enintään 70 merkkiä.
- Ei jäänteitä (JATKOT-, KYSYMYS- tai äänitagirivejä) eikä viittauksia ohjeisiin tai kontekstiin.
- Vaiheessa 1 jokaisella kohdalla on 5 eri kysymystä. Uudet kysymykset ovat enintään 70 merkkiä ja päättyvät kysymysmerkkiin.
