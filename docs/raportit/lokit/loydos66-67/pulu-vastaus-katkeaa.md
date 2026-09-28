# Löydös 67: pulun vastaus katkeaa kesken sanan ("…muurin alta, n")

Pariteettitarkastaja 25.9.2026 klo 05.35–06.10. Omistajan kuva: Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20260925/loydos66-pulu-animointi-chat-iphone.png

## Syy (mitattu)

**Teksti katkeaa jo generoinnissa, eli workerissa.** Natiivin näkymä ja jäsennys eivät ole syyllisiä.
Worker lähettää `loppu`-tapahtumassa kesken sanan loppuvan vastauksen (`syy: null`, `jatkot: []`),
ja kumpikin asiakas näyttää sen valmiina vastauksena linkkeineen. Juuri tämä näkyy omistajan kuvassa:
linkit on jäsennetty (loppu tuli), mutta teksti loppuu sanaan "n".

Todennäköinen juurisyy on malli ja sanaraja yhdessä:
- `tools/pollo/wrangler.jsonc:30` → `"POLLO_MALLI": "claude-sonnet-5"`. Vain oletus MALLI_OLETUS on Haiku 4.5 (worker.js:64).
- `worker.js:1080–1089` (kutsuRajapintaa) ei lähetä `thinking`-parametria. Anthropicin dokumentaation mukaan
  Sonnet 5 ajaa silloin adaptiivisen ajattelun, ja ajattelutokenit lasketaan `max_tokens`-rajaan.
- `worker.js:73` `MAX_TOKENS = 900` ja `worker.js:75` `JATKON_MAX_TOKENS = 350`. Ajattelu syö osan rajasta, joten näkyvä
  teksti loppuu `max_tokens`-pysähdykseen kesken sanan. `jatkaKeskenJaanyt` (worker.js:1248–1266) ajattelee myös, ja sekin
  katkeaa kesken sanan. Kolmatta yritystä ei ole, ja worker.js:1331–1333 lähettää silti `loppu`n `syy: null`.

## Todisteet

Kaikki kolme mittausta tehtiin tuotannon workeriin sivun sisältä (Origin https://matkakirja.app). Runko oli täsmälleen
sama kuin webin oma pyyntö samassa istunnossa: tehtava vastaus, Ateena-konteksti, jossa Hisarlık 1873 -katkelma,
historia [] ja kehys aloitus. Omia avaimia ei käytetty.

1. **`sse-schliemann.txt`** (7224 tavua, 150 verkkopalaa, ajoitukset `sse-schliemann-verkkopalat.tsv`):
   - Ensimmäinen tekstipala tuli vasta **10,4 s** kohdalla. Pitkä hiljaisuus ennen tekstiä sopii ajatteluun.
   - Palat 10,4–17,1 s loppuvat kohtaan "…lähetettyään työmiehet" kesken virkkeen, eli mallin pysähdys oli max_tokens.
   - 6,8 s tauon jälkeen (23,96 s) tuli YKSI iso pala (1547 tavua, `jatkaKeskenJaanyt`-jatko):
     "tauolle, jottei … Löytö herätti heti kysymyksen, joka on seurannut sitä **siit**", eli jatkokin katkesi kesken sanan.
   - `loppu`: `vastaus` 1049 merkkiä, loppu "…joka on seurannut sitä siit", `jatkot: []`, `syy: null`.
     Palojen summa == loppu.vastaus (1049 = 1049), joten worker ei itse hukannut tekstiä.
   - 350 jatkotokenia tuotti vain noin 300 merkkiä suomea, ja 900 tokenia noin 740 merkkiä. Suhde (alle 1 merkki/token)
     on liian pieni pelkälle näkyvälle tekstille, joten valtaosa rajasta kului ajatteluun.
2. **`sse-schliemann-ilman-paloja-1.txt` ja `-2.txt`**: sama runko kahdesti. Kummassakaan ei tullut yhtään `pala`-tapahtumaa
   30 s aikana. Ensimmäinen päättyi `syy: "tyhja"` ("Vastaus jäi matkalle…"). Toinen sai 1032 merkin vastauksen
   `paikkaaTyhja`-uusinnasta (ei-striimi). Ajattelu siis kulutti joskus koko 900 tokenin rajan ennen ensimmäistä näkyvää sanaa.
3. **Webin oma pyyntö** samassa istunnossa tuotti ehjän vastauksen (1259 merkkiä, loppu "…Schliemannilta itseltään.").
   Katkeaminen on satunnaista, ja webin koodi näyttäisi saman katkenneen tekstin, koska pollo.js:6028–6035 käyttää
   `tulos.vastaus` (loppu) sellaisenaan. Vika ei siis ole natiivikohtainen.

## Natiivin jäsennys askel askeleelta (poissuljettu)

Natiivin koodi ajettiin sellaisenaan: PuluChat.cs:863–909 (`SseKasittelija.ReceiveData`/`Pura`/`PoistaKesken`),
`Kasitelinkit` (649–671), `Nakyva` (684) ja `Peli/MiniJson.cs` käännettiin Unityn dotnet+csc:llä (harness
scratchpadissa `l6667/harness/Harness.cs`). Syötteenä oli yllä tallennettu virta neljällä pilkkomisella: kokonaisena,
tuotannon verkkopaloina, 1 tavu kerrallaan (UTF-8-merkit ja `\n\n`-rajat poikki) ja satunnaisesti 1–8 tavua:

| pilkonta | loppu jäsentyi | vastaus | paloja kuplaan | kertynyt == vastaus | Kasitelinkit näkyvä == Nakyva |
|---|---|---|---|---|---|
| koko | kyllä | 1049 | 150 | kyllä | kyllä |
| verkkopalat | kyllä | 1049 | 150 | kyllä | kyllä |
| 1 tavu | kyllä | 1049 | 150 | kyllä | kyllä |
| satunnainen | kyllä | 1049 | 150 | kyllä | kyllä |

- Viimeinen tapahtuma päättyy `\n\n`:ään (worker.js:1282 lähettää aina `…\n\n`), joten DownloadHandlerScript näkee `loppu`n.
  Huoli viimeisen tapahtuman katoamisesta ilman `\n\n`:ää ei toteudu.
- `Suojaa`, `Nakyva` ja `[[…]]`-linkitys eivät syö merkkejä: linkkitagien poiston jälkeen teksti on merkki merkiltä `Nakyva(vastaus)`.
- `PoistaKesken` koskee vain striimin väliaikaista kuplaa, joka poistetaan (PuluChat.cs:710). Lopullinen kupla tehdään
  `loppu.vastaus`ista (729–731).
- Label-leikkaus ei myöskään selitä kuvaa: rivi "seinämästä, muurin alta, n" loppuu kesken sanan, vaikka rivillä on tilaa.
  Rivitys siirtäisi kokonaisen sanan seuraavalle riville, joten merkkijono itse loppuu n-kirjaimeen.

## Korjausehdotus (omistaja: Pelikoodari / worker, tools/pollo)

1. `tools/pollo/worker.js:1080–1089` (kutsuRajapintaa): chat-, jatko- ja ehdotuskutsuille `thinking: { type: 'disabled' }`,
   jonka Sonnet 5 hyväksyy. Vaihtoehto on pitää ajattelu mutta rajata se `output_config: { effort: 'low' }` -asetuksella ja
   nostaa rajaa. Muuten 900 tokenin raja ei riitä.
2. `worker.js:73/75`: jos ajattelu jätetään päälle, `MAX_TOKENS` noin 4000 ja `JATKON_MAX_TOKENS` noin 1500
   (näkyvä pituus pysyy kehotteen varassa).
3. Varmistus `worker.js:1317–1333`: jos jatkonkin jälkeen pysähdys on yhä `max_tokens`, leikkaa vastaus viimeiseen
   kokonaiseen virkkeeseen ennen `loppu`a. Kesken sanan päättyvää tekstiä ei silloin koskaan lähetetä `syy: null`
   -merkinnällä. Sama koskee `paikkaaTyhja`-uusintaa (worker.js:1152–1154), joka ei tarkista `toinen.stop`-arvoa.
4. Natiiviin (Natiivi-UI) ei tarvita muutosta. Testiksi voi lisätä kultaisen jäljen `sse-schliemann.txt` →
   `SseKasittelija` → `Kasitelinkit` (tulos 1049 merkkiä).

Huom. Workerin `stop_reason` ja ajattelutokenit eivät näy asiakkaalle, joten ajattelun osuus on päätelty ajoituksesta,
tokenisuhteesta ja kahdesta paloitta jääneestä virrasta. Katkeaminen workerissa on sen sijaan suoraan mitattu.
Varmistus: workerin lokiin `usage.output_tokens` ja `stop_reason` yhdestä kutsusta, tai sama kutsu `thinking: disabled`
-asetuksella.
