# Christiansborg #2314 — riippumaton mallin QA

**Verdict: WARNING / KK:n arvioitavaksi syötekuvan pääjulkisivun tasolla. Ei hyväksytty tai integroitu pelimalli.** Ei näkyvää nykyisen palatsitornin tai kirkon lisäämistä, mutta yksi etukulmasyöte ei vahvista koko1883 rakennuspohjaa tai vastapuolia.

Luettu `../../christiansborg/source-preparation.md`. Katsottu hyväksytty `../../christiansborg/christiansborg-model-v1.png` sekä kaikki viisi `qa-browser/01-plusX-full.png`, `02-plusZ-full.png`, `03-minusX-full.png`, `04-minusZ-full.png`, `05-upper-oblique-full.png`. Syötekuvan ja arkistomallin SHA256:t tarkistettu kirjattuihin arvoihin. Kuviin valmiiksi tallennettu UI ei tarkoita tässä tehtyä selainkäyttöä.

- **Oikea ajankohtainen yleisilme: PASS syötevastaavuudelle.** Matala/pitkä Hansenin neoklassinen palatsi, kerroksellinen julkisivu, keskikolonnadi ja päätykolmio sekä sivurisaliittien päädyt säilyvät. Ei nykyistä korkeaa Christiansborgin tornia, kupolia tai erillistä kirkkoa. Ei ratsastajapatsasta tai siltaa. Tämä on vastaavuus hyväksytyn1883 syötekuvan kanssa, ei riippumaton historiallinen mittavarmennus.
- **Pääjulkisivu: pääosin säilyy.** Keskipylväikkö ja sen alla kaariaukkojen rytmi erottuvat, samoin matalampi sivusiipi. Pienet veistokset, ikkunat ja listat pehmenevät tai muuttuvat pintakuvioiksi. Pylväiden välit näyttävät syvemmiltä kuin tavallinen seinätekstuuripinta, mutta ovien/kaarten todellista läpäisevyyttä ei ole testattu.
- **Katto/siluetti: PASS yleistasolle, piiloratkaisut UNCERTAIN.** Laaja tumma katto ja savupiippurivi säilyvät, eikä mukaan ilmesty ylimääräistä huipputornia. Yläviistossa malli on käytännössä pitkä umpikattorunko ja siihen liittyvä sivuosa. Hyväksytyn kuvan peittämät kattoliitokset ja takaosan täydellinen pohja ovat Tripon tulkintaa. Kuvasta ei hyväksytä oikeaksi koko kadonneen palatsin piha- tai siipijärjestelmää.
- **Päädyt ja takasivu: WARNING.** Vastakkaisella pitkällä sivulla on yksinkertaistettu säännöllinen ikkunarytmi; päätyjen seinä- ja kattoalat on täydennetty yhden kuvan perusteella. Lähdevalmistelu nimeää juuri nämä alueet puutteellisiksi. Säännöllinen ja ehjä mallipinta ei tee niistä lähdevarmoja. Ei selvää irrallista suurta siipeä, mutta takapuolen yksityiskohdille ei anneta hyväksyntää.
- **Pinta:** vaalea kerma ja tummanharmaa katto säilyvät. Sävy on lähdevalmistelun mukaan yhden litografian tulkinta, ei1883 valokuvista varmennettu väri. Paikoin rakeinen kattotekstuuri ja sumeat listat ovat lähikuvan rajoite. Ei suurta puuttuvan materiaalin valkoista kattoa.

**Suunnat:** neljä paikallista akselisivua+X,+Z,-X,-Z sekä yläviisto dokumentoitu. Niitä ei nimetty maantieteellisiksi ilmansuunniksi. Absoluuttimitat, pelikameran luettavuus ja historiallinen koko pohjan tarkkuus ovat vahvistamatta.

**Metadata:**1 883 022 kolmiota,1 101 575 POSITION-verteksialkiota,76 092 556 tavua. Upotetut JPEG:t: baseColor8192², normal4096², metallicRoughness4096². Ei ulkoisia riippuvuuksia tai vaadittuja laajennuksia. Arkisto-SHA täsmää; metriikka on rakenteellinen inventaario, ei täysi glTF-validointi.

**KK-rivi:** Hansenin torniton palatsi ja pylväspääjulkisivu säilyvät ilman kirkkoa; takasivun ikkunointi, kattopohjan piiloliitokset ja koko1883 siipijärjestelmä jäävät yhden mallikuvan tulkinnoiksi.

Ei mallimuutoksia, generointia, renderöintiä, selainta, lähetystä tai yhteisiä checkpoint/ledger-muutoksia. Vain glb-metrics.json ja tämä QA kirjoitettu Christiansborgin työkansioon; alkuperäinen GLB säilyi.
