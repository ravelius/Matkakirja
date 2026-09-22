# Laattojen esilataus levossa (Karttaseppä 22.9.2026, erä E1)

Omistajan tilaus (Fable 22.9.): levossa seuraavan tason laatat näkymän
ympäriltä (+50 %) ja saapuessa koko kohdemaan z6–z8 palvelutyöntekijän
välimuistiin, jotta zoomatessa laatat tulevat levyltä eikä verkosta.
Suunnitelma: Pelikoodarin docs/raportit/esilataus-suunnitelma-20260922.md,
prioriteetti 1 (laatat). Yleinen jono, lepo/keskeytys SW:ssä ja tallennusraja
ovat Pelikoodarin eriä; tämä erä käyttää olemassa olevaa
`esilataa-pallolaatat`-viestiä ja tahdittaa itse.

## Mitä tehtiin

- **sw.js**: pyramidin laatat (`/julisteet/pyramidi/…`, ei .json) palvellaan
  samasta korista kuin pallon laatat (välimuisti ensin, talletus ensimmäisellä
  haulla) — aiemmin ne eivät osuneet mihinkään koriin (fetch ilman
  `destination: image`), vain HTTP-välimuistiin. Esilatausviesti hyväksyy
  pyramidin osoitteet; kansiosiivous ei koske niihin (versio vaihtuu
  luettelossa, vanhat vanhenevat FIFO-katon 3000 kautta). Rinnakkain 4.
- **js/laattaesilataus.js**: jono (näkymän z+1 kärkeen, maa perään), erä 20
  osoitetta / 250 ms vain levossa (≥ 300 ms ilman kameran liikettä ja sormea),
  sama osoite kerran; `maanLaatikko` = suurin rengas + renkaat ≤ 12° sen
  keskipisteestä (Ranska: manner + Korsika, ei Guyane/Réunion).
- **js/pallolaatat.js**: lepopäivityksessä (1e) näkymän laatikko × 1,5 →
  z+1:n laatat kaikille käytössä oleville kerrostasoille; `asetaEsilatausMaa`
  (odottaa luetteloa); mittari `laatat.esilataus`. **js/pallolauta/lauta.js**:
  kohdemaa jonoon korostuksen renkaista, kun ne ovat saapuneet.
- Kytkin `?esilataus=0`.

## Mitattu (savuke-laattaesilataus.mjs, Chromium 390 × 844 dpr 3, SW päällä, ämpäri Noden kautta)

| | ilman (`?esilataus=0`) | esilatauksella |
| --- | --- | --- |
| korissa pyramidin laattoja 6 s levon jälkeen (Ranska z7, korkeus 0,2) | 222 | 686–1136 |
| jono | – | näkymä z8 ≈ 410 osoitetta + FRA z6–z8 718 osoitetta, 20/erä |
| karkean tason näkymisaika z7→z8 (90 % peitto) | 433–450 ms | 432–548 ms |

Macilla verkko ei ole pullonkaula (TTFB 21–56 ms), joten esilataus ei
lyhennä karkean tason aikaa täällä — se poistaa verkon osuuden, joka
puhelimen LTE:llä on 50–150 ms laattaa kohti. Erä 40 → 20 osoitetta:
suurempi erä jätti SW:lle ruuhkan, joka näkyi zoomissa (+115 ms).
Laitetestaaja mittaa iPhonella: sama savuke ei aja WebKitissä (SW:n
noudot eivät reitity), joten puhelimella luetaan `laatat.esilataus` ja
korin koko käsin.

## Auki

- SW:n oma tauko liikkeessä (`esilataus-tauko`) ja tallennusraja: Pelikoodarin
  erä 1–2; nyt tauko syntyy vain siitä, ettei uusia eriä lähetetä.
- Maailmanäkymän z+1 (z0–z3) ei ole esilatauksen kohde: näkymän laatikko × 1,5
  koko pallolla olisi tuhansia laattoja — jono rajaa tason vaihdon kautta
  (levossa vain seuraava taso), mutta koko pallon z4 on silti ~300 laattaa.
  Jos se näkyy datankäytössä, rajataan korkeuteen (< 0,5).
