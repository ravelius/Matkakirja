## 2026-09-27 — SISÄLTÖKIRJURI → KUVAPUTKI: 22 jäljellä olevaa poikkeamaa käsin arvioitavaksi (uusintamittaus tuotannosta)

Omistajan päätös (Fablen välittämänä 27.9.2026, tyylitarkastuksen
`docs/raportit/nahtavyyskuvien-tyyli-20260927.md` ja koneellisen tasauksen
`docs/raportit/nahtavyyskuvien-tasaus-20260927.md` pohjalta): PR #3413
(413 tasattua kuvaa) on nyt vahvistetusti tuotannossa (commit `91d016862`,
"deploy"-check onnistunut). **Koneellinen tasaus ei riitä pidemmälle** —
se korjaa vain kuvan KESKIMÄÄRÄISEN S-kanavan kylläisyyden per kuva
(lineaarinen skaalaus), mutta ei voi muuttaa kuvan SISÄISEN värijakauman
muotoa: esim. yksittäinen erityisen värikäs yksityiskohta (esim. punainen
katto, lippu) pysyy suhteellisesti muita kohteen osia värikkäämpänä riippumatta
koko kuvan skaalauksesta (ks. tasausraportin kohta 2, viimeinen kappale).
Näiden jäljellä olevien poikkeamien korjaaminen vaatii siis Codexin
käsin/taiteellista arviota (esim. yksittäisten yksityiskohtien
kylläisyyden tasaamista), ei uutta mekaanista ajoa.

### Miksi tämä on UUSINTAMITTAUS eikä sama lista kuin raportissa

Alkuperäisen tasausraportin 23 poikkeaman TARKKAA nimilistaa ei koskaan
tallennettu committoituun tiedostoon — se oli vain edellisen session
tilapäisessä scratchpadissa, joka on kadonnut. Tämä tilaus perustuu
27.9.2026 tehtyyn UUTEEN mittaukseen samalla menetelmällä tuotannon
NYKYISESTÄ tilasta (worktree `postilaatikko-arviotilaus`, pohja
`origin/main` commit `b21c2e73b`, joka sisältää PR #3413:n):

1. `node tools/nahtavyyskuvien-kartta-json.mjs > /tmp/miniatyyrit-map.json`
2. `python3 tools/nahtavyyskuvien-tyylimittari.py --kansio assets/kartat/miniatyyrit --map /tmp/miniatyyrit-map.json --ulos /tmp/mittarit-nyt.json`
3. Suodatus: "vanha/muu mitta" -sukupolven kuvat, joiden kylläisyys
   poikkeaa tavoitteesta (0,332) yli 1,75 × hajonta — hajonta laskettu
   TÄSTÄ datasta, ei oletettu: `pstdev` = 0,0496 (lähes identtinen
   tasausraportin lopputuloksen 0,050 kanssa — pipeline on siis pysynyt
   vakaana tuotannossa).

**HUOM (rajaus):** kaikki tähän mittaukseen tarvittavat kuvat (332
"vanha/muu mitta" + 81 "Codex-kohtaus", yhteensä 413) ovat PAIKALLISESTI
`assets/kartat/miniatyyrit/`-kansiossa PR #3413:n ansiosta — R2-ämpäristä
ei tarvinnut ladata mitään referenssikuvia tätä poikkeamalistaa varten,
koska tuotannossa olevat korjatut kuvat ovat kaikki repossa. (R2:ssa on
lisäksi 565 "-vari2"-referenssikuvaa ja 92 muuta R2-only-tunnusta, mutta
niitä ei mitattu tässä — ne eivät olleet osa "vanha/muu mitta" -sukupolven
poikkeama-analyysiä alkuperäisessäkään raportissa.) Mittaus on siis
TÄYSI, ei kevennetty versio.

**Tulos: 22 poikkeamaa** (raportin arvio oli 23 — pieni ero on odotettu,
koska tarkkaa vanhaa listaa ei ollut säilössä eikä kynnysarvon
tarkkaa laskutapaa toistettu identtisesti; 4 kuvaa on juuri kynnyksen
alapuolella, z=1,71–1,75, listattu erikseen lopussa avoimuuden vuoksi).
Kaikki 22 ovat "vanha/muu mitta" -sukupolvea, kuten raportissakin ("Codex-
kohtaus"-sukupolvi: 0/81 poikkeamaa, täysin korjattu). Kaikilla 22:lla on
läpinäkyvä tausta (ei maalattua taustaa — ks. seuraava kappale).

### 21 liian värikästä + 1 liian haalea

21 kuvaa on YLI tavoitteen (kylläisyys 0,42–0,49, sama vaihteluväli kuin
raportissa mainittu), mutta yksi — `oslo-oopperatalo.webp` — on tällä
kertaa AL­LE tavoitteen (S=0,2398, ero −0,092). Tämä ei täsmää raportin
kuvauksen "0,42–0,49" kanssa: joko kyseessä on tuotantoon tulon jälkeen
ilmennyt/muuttunut poikkeama, tai se ei ollut alkuperäisen 23 kuvan
listalla. Raportoidaan rehellisesti mitattuna, ei jätetä pois.

| Kaupunki | Kohde | Tiedosto | Kylläisyys nyt | Ero tavoitteesta (0,332) |
| --- | --- | --- | --- | --- |
| madrid | Tapaskierros | `madrid-tapaskierros.webp` | 0,4910 | +0,159 |
| madrid | Chotis | `madrid-chotis.webp` | 0,4449 | +0,113 |
| helsinki | Kaisaniemen puisto | `helsinki-kaisaniemen-puisto.webp` | 0,4433 | +0,111 |
| amsterdam | Yövartio | `amsterdam-yovartio.webp` | 0,4420 | +0,110 |
| helsinki | Johanneksenkirkko | `helsinki-johanneksenkirkko.webp` | 0,4404 | +0,108 |
| lontoo | Globe 1599 | `lontoo-globe-1599.webp` | 0,4331 | +0,101 |
| amsterdam | Maitotyttö | `amsterdam-maitotytto.webp` | 0,4330 | +0,101 |
| madrid | Goyan kansankuvat | `madrid-goyan-kansankuvat.webp` | 0,4325 | +0,101 |
| helsinki | Suomenlinna | `helsinki-suomenlinna.webp` | 0,4324 | +0,100 |
| lontoo | Palo 1666 | `lontoo-palo-1666.webp` | 0,4317 | +0,100 |
| helsinki | Suomi herää 1899 | `helsinki-suomi-heraa-1899.webp` | 0,4295 | +0,098 |
| helsinki | Linnanmäki | `helsinki-linnanmaki.webp` | 0,4291 | +0,097 |
| berliini | Gaertnerin Berliini | `berliini-gaertnerin-berliini.webp` | 0,4288 | +0,097 |
| helsinki | Uspenskin katedraali | `helsinki-uspenskin-katedraali.webp` | 0,4275 | +0,096 |
| lontoo | Fleming 1928 | `lontoo-fleming-1928.webp` | 0,4274 | +0,095 |
| lontoo | Metron höyryveturi | `lontoo-metron-hoyryveturi.webp` | 0,4270 | +0,095 |
| amsterdam | Kapein talo | `amsterdam-kapein-talo.webp` | 0,4260 | +0,094 |
| amsterdam | Herengracht 537 | `amsterdam-herengracht-537.webp` | 0,4240 | +0,092 |
| ljubljana | Prešernin aukio | `ljubljana-pre-ernin-aukio.webp` | 0,4229 | +0,091 |
| lontoo | Exchange Alley | `lontoo-exchange-alley.webp` | 0,4218 | +0,090 |
| lontoo | Canaletto Lontoossa | `lontoo-canaletto-lontoossa.webp` | 0,4211 | +0,089 |
| oslo | Oopperatalo | `oslo-oopperatalo.webp` | 0,2398 | −0,092 (liian haalea, poikkeava suunta) |

Rajatapaukset juuri kynnyksen alla (z=1,71–1,75 — EI mukana yllä olevassa
22 kuvan listassa, mainittu vain avoimuuden vuoksi, ei osa tätä tilausta):
`helsinki-temppeliaukion-kirkko.webp` (S=0,4186), `luxemburg-bockin-
kasematit.webp` (S=0,4188), `lontoo-lontoon-silma.webp` (S=0,2468, liian
haalea), `lontoo-turbiinihalli.webp` (S=0,4168).

### Jo tilattu erikseen — EI toisteta tässä

7 "maalattua taustaa" -kuvaa (`ateena-diogeneen-astia.webp`,
`ateena-elginin-marmorit.webp`, `pariisi-impressionistit.webp`,
`pariisi-vrain-lucas.webp`, `rooma-kolikko-olan-yli.webp`,
`wien-taikahuilu.webp`, `wien-vuoristovesijohto.webp`) ON JO TILATTU
tänään erillisenä tilauksena: `posti/sisaltokirjuri-kuvaputki-7-maalattua-
taustaa-20260927.md` (commit `ae6dd383d`, haara `claude/postilaatikko`).
Ei mikään yllä olevan 22 kuvan listalta ole päällekkäinen näiden 7 kanssa
(tarkistettu tiedostonimivertailulla) — nämä ovat kaksi ERI, RINNAKKAISTA
tilausta, ei toisteta samaa sisältöä kahdesti.

### Pyyntö

Arvioi ja korjaa käsin/taiteellisesti yllä olevat 22 kuvaa niin, että
niiden kylläisyyden JAKAUMA (ei vain keskiarvo) vastaa muuta tuotantoa
(tavoite S-mediaani n. 0,332, muun tuotannon vaihteluväli suunnilleen
0,25–0,40 sisältöpikseleiltä). 21 kuvaa tarvitsee vaimennusta (liian
värikäs, usein yksittäinen yksityiskohta liian kylläinen), 1 kuva
(`oslo-oopperatalo.webp`) tarvitsee päinvastaisen suunnan (nosto, liian
haalea). Tyyli muuten sama kuin muissa tämän sukupolven ("vanha/muu
mitta") kuvissa samalla kaupungilla — älä muuta sommittelua, rajausta
tai kohteen tunnistettavuutta.

### Lähdekuvat

Kaikki 22 kuvaa ovat PAIKALLISESTI repossa:
`assets/kartat/miniatyyrit/<tiedostonimi>` (esim.
`assets/kartat/miniatyyrit/madrid-tapaskierros.webp`). Näitä EI tarvitse
hakea R2:sta — ne ovat jo tuotannon oikeat, PR #3413:n tasaamat versiot.

### Toimitus

Sama käytäntö kuin aiemmissa kuvatilauksissa: uudet webp-tiedostot
samoille poluille PR:ään, avoinna Julkaisijan junaan (ei mergeä itse).
Aja `node tools/mittaa-miniatyyrit.mjs` (committoi `tools/miniatyyri-
mitat.json`) samassa PR:ssä, koska tiedostojen sha256 muuttuu. Kirjoita
tähän postilaatikkoon rivi "PR #n valmis junaan" kun toimitat.
