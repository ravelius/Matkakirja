# Pariteettikierros: natiivi vs. web (24.9.2026)

Omistajan kysymys: näyttääkö ja toimiiko natiivi täsmälleen kuten web,
myös pienissä yksityiskohdissa. Web-kuvat Playwrightilla (Chromium
`--use-angle=metal`, oikea GPU) tuotannosta https://matkakirja.app/,
natiivi-kuvat iOS-simulaattorista (`ui`/`peli`/`linssi`-komennot).
Pisteleveys: iPhone 393 × 852 CSS-px, iPad 834 × 1194.

Kuvat eivät ole repossa (levytila, CLAUDE.md dist-periaate) —
polut viittaavat tämän Macin scratchpad-kansioon
`.../pariteetti/<laite>/<web|natiivi>/`. Hyväksytyt erot, joita ei
kirjata: pohjakartta 23a, vesistöjen uoma, värivivahde 0,96–0,99.

## Tunnetut esteet

- **Web-etusivun otsikko piilossa automaatiossa**: `.intro-juliste`
  jää `opacity:0`-tilaan, luokka `avaus-kesken` ei poistu edes 15 s:ssa
  Chromium+Metal-GPU:lla. Kirjattu Pelikoodarille erikseen
  24.9.2026. Etusivun rivi alla merkitty ODOTTAA kunnes korjautuu —
  vertailu ei ole reilu ennen sitä.

## Taulu (iPhone, aloitettu 24.9.2026)

| # | Näkymä | Ero | Kuvapari | Vastuu |
|---|--------|-----|----------|--------|
| 1 | Etusivu/portti | ODOTTAA — web-otsikko piilossa (ks. yllä), joten kokonaisvertailu kesken. Rakenteellisesti sama pino (logo, otsikko, pallo, äänipainike, päänappi, footer) siltä osin kuin web näkyy. Web-istunto oli tuore (vain "Aloita seikkailu"), natiivilla oli tallennus (myös "Jatka matkaa" + "Uusi matka") — eri pelitila, ei bugi; uusittava samalla tallennustilalla kun web korjautuu. | iphone/web/01-etusivu.jpg, iphone/natiivi/01-etusivu-v3.jpg | Pelikoodari (avaus-kesken), sitten Natiivi-UI |

| 2 | Aloitusvalinta (kaupunkivalinta pallolta) | **ERO**: webissä valittavissa olevat kaupungit (Moskova, Istanbul, Ateena, Kairo) korostuvat kultaisella/oranssilla HEHKURENKAALLA ympärillään — helposti erottuvat muista pisteistä. Natiivissa samat kaupungit ovat vain tavallisia oranssin väriseikä pisteitä, EI rengashehkua — vaikeampi huomata mitkä kaupungit ovat valittavissa. Lisäksi natiivissa näkyy kaksi kelluvaa ikoninappia oikealla (lista/selite, linssit-silmälasit) joita web ei näytä tässä näkymässä. Web merkitsee Lontoon erikoisella nastaikonilla, natiivi pelkällä mustalla pisteellä. Pulu (kyyhky) näkyy molemmissa oikeassa alakulmassa. **Huom**: natiivin kuvassa näkyy tumma liuska ylimpänä (siirtymäanimaation jäänne `ui aloitus valinta` -pikakomennosta, ei välttämättä oikean navigointipolun tila) — uusittava oikealla klikkausvirralla varmuuden vuoksi. | iphone/web/02-aloitusvalinta.jpg, iphone/natiivi/02-aloitusvalinta.jpg | Natiivi-UI |

Jatkuu… (odottaa Fablen ohjeistusta priorisoinnista ja mahdollisesta työnjaosta ennen kuin jatkan koko 40 näkymän listaa)
