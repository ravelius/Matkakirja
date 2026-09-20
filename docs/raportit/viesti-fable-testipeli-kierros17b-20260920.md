# Testipeli, kierros 17b — v1971 (20.9.2026 klo 4.24–4.44)

Laite: iPhone-simulaattori (390 px), tuotanto v1971 (ladattu 2.30), maailma-kytkin päällä 4.26–4.43
(**pois, vahvistettu ratasvalikosta 4.43**), äänet pois. Pyramidipoltto oli ohi (Fable: 3.18); simulaattori toimi sujuvasti.
Kaappaukset: `docs/raportit/kaappaukset/kierros17-20260920/` (nimet `b-*`, `bry-*`, `kos-*`, `tur-*`, `lju-*`).

## Yhteenveto

| Kohta | Tulos |
|---|---|
| Ljubljana: shakkinappula → "Turistiopas · Historia (1)" → Historia-rivi (toisto) | **Toistuu:** rivin napautus sulkee paneelin heti; lehteä ei avaudu (kaappaukset 0 s, 1,5 s, 4,5 s: `b-lju-historia-a/b/c`, paneeli `b-lju-paneeli`). |
| Bryssel: sama | **Sama:** paneeli "Bryssel Turistiopas · Kulttuuri ja ruoka (1)" (`bry-paneeli`), rivin napautus sulkee sen, lehti ei avaudu (`bry-rivi-a/b/c`). Huom.: paneelissa näkyy vain **yksi** aihe (Kulttuuri ja ruoka; Ljubljanassa vain Historia), ei "Etusivu / Historia / Rakennukset / Ruoka". Tulkinta: paneeli on ehkä karttaselitteen aihesuodatin ("Väripallo sytyttää valot aiheen kohteisiin"), ei lehden sisällysluettelo — jos näin on, se toimii; jos lehden pitäisi avautua, se ei avaudu. |
| Kaupunkilehden avautuminen muuten | En löytänyt reittiä. Kokeilin: otsikon napautus (laajentaa saapumisen tekstin, ei lehteä), ☰ (ääniasetukset), karttaselite-nappi (aihesuodatin), maan kartuscha (Belgia, Slovenia: vain "Valtiomuoto 1873", ei kategorioita/maalehteä toisin kuin Ranska). **Kerro, mistä Bryssel/Ljubljana-lehti avataan.** |
| Saapumisblur (Bryssel) | **OK:** sumea kartta taustalla koko saapumisen ajan, kuvat liukuvat sivulle, "BRYSSEL"-otsikko pysyy paikallaan; ei hyppäystä kolmessa peräkkäisessä kaappauksessa (`bry-arr-4/5/6`). Pariisi (v1970) sama. Ljubljana/Košice: saapumisvaihe ehtii ohi ennen kaappausta (kortti `kos-teksti`, `v1971-valinta-otsikko`). |
| Tekstinvalinta | Ks. osaraportti v1970/v1971: ei valintaa (pitkä painallus, kaksoisnapautus otsikossa ja leipätekstissä). Lisäksi tällä kierroksella: napautus otsikkoon ja pitkä painallus **laajentavat saapumistekstin**, ei valintaa. |
| Košice | Saapumisteksti ok ("Kassa (Košice), lokakuussa 1873 … tuomiokirkko …", pitkä painallus laajentaa). Nosto Ochtinská aragoniittiluola: kuva ok (aragoniittikiteitä), LISÄÄ ok, pulu-kysymykset ok, ei visaa. **Kuvatekstissä "Ochtinán luolan", artikkelissa "Ochtinská"** (kirjoitusasu vaihtelee). Muita Košicen nostoja en löytänyt kartalta (vain Ochtinská näkyi). |
| Pulun vastaus (Košice, Ochtinská) | **Vuotanut wiki-merkintä:** vastauksessa teksti "…osa Aggtelekin ja Slovakian karstin **luolat\|Aggtelekin ja Slovakian karstin luolia**, jotka kuuluvat…" (kaappaus `kos-pulu-c`). Lisäksi vastauksen oikeassa reunassa **mustavalkoinen sotakuva (bunkkeri + lippu) "1954"-linkin vieressä** — kuvan yhteys kysymykseen on epäselvä (mahdollisesti Dien Bien Phu 1954). Ensimmäinen lause "Kato, tästä on tietoruudussa suoraan luku." toimii. |
| Biskajanlahti ja Välimeri lähizoomilla | **Merinostoja ei näkynyt** kahdella zoomitasolla Biskajanlahdella (`b-biskaja-4/5`) eikä Barcelonan–Baleaarien välillä (`b-canigou-nav-4`). En tiedä, missä merinostot sijaitsevat; kerro koordinaatit tai nimi. |
| TUR | Kappadokia/Ankara: nosto "Silkkiä ylängöltä" (ankaravuohi). Kuva ok, kuvatekstissä ja LISÄÄ-kortin suurennoksessa **"Tekoälyllä tuotettu havainnekuva. Laji- ja ympäristöviitteet: kuvatoimituksen aiemmin tarkistettu E1-kuva."** (merkintä ok). Löytöpalkkio +20 (£100→£120) ja rivi "Löytöpalkkio +20 puntaa lisätty kukkaroon". Kortissa **ei ole pulu-kysymyksiä eikä visaa**. Istanbulia ja muita TUR-nostoja en avannut. |
| Zoomaus/panorointi laitteella | **Sujuva:** pinch-out/in ja swipe-panorointi reagoivat välittömästi (kartta↔pallo, globe-kierto 150 pt ≈ 50°), ei tökkimistä havaittu 4.26–4.43. Yksi outo kohta: kaksi peräkkäistä pinch-in-käsittelyä Kosicen jälkeen loi tyhjän merinäkymän (ohjauksen ylipyöristys, ei vika). |

## Muut havainnot

1. **Kartuschan alla oleva merkki reagoi napautukseen:** kun Belgian kartuscha oli auki, napautus kartuschan runkoon (150,700) avasi kartuschan takana olevan Semois-noston (`bry-kartuscha-2`). Tulos: tapit menevät kartuschan läpi — pieni häiriö (voi olla tarkoituksellinen).
2. **Uuden noston avaus Turkissa ei matkusta:** Kappadokian merkin napautus avasi noston (ankaravuohi) mutta ylätunniste pysyi "Bryssel, kesäkuussa 1873" — maailma-tilassa tarkoituksellista?
3. Arvonimi Košice (Ochtinská): "Krivanin huipun tähystäjältä". Turkki (ankaravuohi): ei pulua → ei nimeä.

## Ei ehditty

ISS-merkki Astronautin kamerassa ja astropulun vastaukset — **en löytänyt linssin avausreittiä** (kokeilin: pallo pienimmällä zoomilla, karttaselitenappi, pallon napautus; ei linssiä). Kerro miten astronautin kamera avataan. Lisäksi: Ljubljanan pöllö/artikkeli/kuvat/radio (Ljubljanan nostoista vain Idrija v1970:ssä), Bryssel pöllö/artikkeli, Canigou (ei löytynyt, en ehtinyt Ranskan maakartalle Pyreneille), TUR Istanbul ja muut kuvat, Košicen muut nostot, Brysselin minitehtävät. Yksi kierros ~20 min; jatkan pyynnöstä.
