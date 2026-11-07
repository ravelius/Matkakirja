# Pariisin ensimmäinen julkisivupala · #2194

Toimituksessa on yksi 1024 × 1024 PNG-julkisivupala, pariisi-julkisivu-kerros.png. Se esittää yhden ikkunavälin ja yhden kerroksen. Tarkistus-4x4 on saman palan suora 4 × 4 toisto koossa 4096 × 4096. Tarkistus-128 on alkuperäisestä palasta pienennetty 128 × 128 kuva.

## Työkalu ja alkuperä

Kuva luotiin sisäänrakennetulla OpenAI ImageGen -työkalulla. Tehtiin kaksi kokonaista ottoa ja valittiin toinen. Toimituksessa on vain tämä yksi valittu julkisivupala. Ensimmäisessä otossa näkyi varjokaistoja listojen alla.

Lähdetilaus on posti/pt-codex-julkisivu-pariisi-kerros-20261107.md, commit 19778b11502a938edd0052762442f3af33a6dce1, blob a8bfb7a643d385b7e4e1c48f339d472285cff0a0. Tyyliviite on saman commitin proto-3d/_tyo/codex/pariisi-koko-kaupunki/pariisi-koko-kaupunki-G-tyyli.png, blob 8c08167deaf4a2c7b70bffc7c021df1b42284480, SHA-256 692ff29f2c330a77d56dd6dd2f6bd50c4822d404ff128365b57cdd51b8fa2bde. Viitteen tavut tarkistettiin ennen tuotantoa. Lopullinen kuva on uusi yleinen talon julkisivu. prompt.txt sisältää valitun oton täydellisen kehotteen.

## Vienti ja tarkistus

Generaattorin 1254 × 1254 RGB-tulos vietiin Pillow'lla harmaasävyiseen L-muotoon ja pienennettiin Lanczos-suodatuksella 1024 × 1024 kokoon. Tarkistuskuvat tehtiin tästä lopullisesta PNG:stä. PNG:n L-muoto varmistaa aidon harmaasävyisyyden. Geometria on suoraan edestä, muodot pelkistettyjä ja kontrasti pehmeä. Toisessa otossa ei näy ensimmäisen oton suuntaavia varjokaistoja. Maalauksessa on edelleen hieno laaja sävyvaihtelu.

## Ilmoitettu poikkeama

Täsmällinen saumattomuusvaatimus jäi toteutumatta. Vasemman ja oikean reunan pikseliero on keskimäärin 1,138 ja enintään 7 harmaasävyaskelta 255:stä. Ylä- ja alareunan ero on keskimäärin 0,569 ja enintään 3 askelta. Reunat eivät siis ole pikselilleen yhtenevät. QA.json kirjaa qualityPass=false tämän vuoksi. Toisto näyttää pienessä koossa rauhalliselta, mutta täysin saumattomaksi hyväksyntä edellyttää tämän poikkeaman käsittelyä.

Toimitus on KK:n arviointiin. KK:n hyväksyntä odottaa ennen muita julkisivupaloja. Pelikytkentä ja julkaisu odottavat erillistä vaihetta.
