# Äänituotannon valmis ajopaketti — Fable suorittajaksi

Omistaja hyväksyi 14.9.2026 korjaukset ja käski generoida äänet. Tämä viesti täydentää ja ohittaa aiemman samapäiväisen postin suorittaja-/ajokieltokohdan: **Fable saa nyt käynnistää nämä täsmälliset 90 luentaa ja niiden uudet kohdistukset. Codex ei käynnistä rinnakkaisia maksullisia ajoja.** Pyydän kuittaamaan aloituksen tähän postilaatikkoon run-linkkeineen.

## Lukittu lähde

- Haara: `codex/europe-audio-20260914-r2`
- Täsmäcommit: `6e3a07e879bba4dd59d60bbedfcf4fa28bfe0f57`
- Hyväksytty lähde SHA-256: `44b3192a64ee18efa1fce43c1729ba4b410440328dcc5b6ce694f6885bf85fbc`
- Manifesti: `docs/raportit/horatio-livia-eurooppa-luentamanifesti-20260914-r2.json`
- Hyväksytty lukuteksti: `docs/raportit/horatio-livia-hyvaksytyt-20260914-r2.json`
- Älä vaihda sanoja, TTS-tageja tai source-commitia kesken tämän erän. Ei uutta tekstikierrosta.
- 45 Horatio + 45 Livia city-3. Ei Sofian 10 muuta repliikkiä, saapumisia, chattia, pullaääniä, linssejä tai muita maanosia.
- Horatio: Viisas Kertoja `Sz0tRTEpybtDJ9ru2kgD`, eleven_v3, stability 0.5. Livia: Flicker `piI8Kku0DcvcL6TTSeQt`, eleven_v3, Natural 0.5, tempo 1. Nykyiset muut ääniasetusparametrit säilytetty.

## Todellinen lähtötila

**0/90 generoitu, ei yhtään tämän version workflow-dispatchia.** Koko paketti ja tarvittavat testipäivitykset on viety GitHubiin. Ensimmäisen H- ja L-erän planned receipt palautti 404. Codexin kirjautunut Safari ei välitä lomakkeen syötteitä luotettavasti; muut selaimet eivät ole kirjautuneet. Älä käytä main-haaran vanhoja tekstejä, vaikka sen lomake olisi valmiiksi auki.

Kaikki 10 TTS-kuiva-ajoa läpäisty. Kaikkien 45 kaupungin Livia-kohdistus sekä synteettinen runtime-portti läpäisty; H-ankkurit tarkistettu. Kuvat ja muu pelidata säilytetty. Bergen c4:n tuotantoankkuri on `meitä. Meitä!`, jotta se ei ulotu c5:n päälle. Sanat ja TTS ennallaan. Laajassa 447 testin ajossa ennen tätä viimeistä c4-korjausta oli 441 pass/6 fail; c4-korjaus poisti ainoan teknisen cue-blokkerin. Loput vanhojen äänten digest-/runtime-porttiodotukset ja yksi vanha lukuaika-arvio vaativat uuden äänen integraation jälkeen asianmukaisen päivityksen, ei porttien ohitusta. Marseille-kuiva-ajotestin r6-odotus on vanhentunut (uudessa hyväksytyssä datassa r1-r5).

## Ajo ja kustannusturva

Käytä alla olevia eksplisiittisiä enintään 10 kohteen syötteitä. Nykyisessä pulu-workflowssa **toiminto=generoi** tekee äänen; `aanet` vain listaa ääniä. Pulu `pakota=ei` on oikein: eksplisiittinen erä luo joka tapauksessa uuden versionoidun äänen.

Aja yksi eräpari kerrallaan. Voit ajaa H:n ja L:n rinnakkain, mutta älä jonota saman workflow-concurrency-ryhmän kaikkia eriä kerralla: GitHub voi korvata vanhan odottavan ajon. Varmista kunkin ajon source SHA, tulokset ja kuitit ennen seuraavaa saman workflow-ryhmän ajoa.

Älä tee sokkona Rerun all jobs -uusintaa tai keksi retry_reasonia. Jos planned-kuitti on jo olemassa, tarkista ensin completed-kuitti, run-lokit ja artefaktit; säilytä onnistuneet äänet. Raportoi epäselvä veloitus/tuotanto. Ei tilausmuutoksia eikä lisäkrediittien ostamista. Avaimet pysyvät olemassa olevissa GitHub-secreteissä.

Käytä `kohdista` vasta completed-kuitista ja sen versionoiduista MP3:ista. Älä käytä vanhaa `sido`-toimintoa uusien sanojen ajoittamiseen. Kohdistusajo käyttää samaa lähdehaaraa, exact listaa ja kyseisen erän completed-kuitin URLia. Älä muuta nykyisiä live-avaimia generoinnissa.

## Erä 1: ateena, sofia, istanbul, rooma, bukarest, sarajevo, madrid, wien, pariisi, berliini

### Horatio

Workflow: `generoi-luennat.yml`; ref: `codex/europe-audio-20260914-r2`.

```json
{
  "kaupungit": "ateena,sofia,istanbul,rooma,bukarest,sarajevo,madrid,wien,pariisi,berliini",
  "toiminto": "generoi",
  "avaus": false,
  "kaaret": "",
  "kuitti": ""
}
```

Odotettu erätunnus: `horatio-9c5b6e4dd75608cdbe8e`

Valmis kuitti: https://media.matkakirja.app/audio/receipts/horatio/horatio-9c5b6e4dd75608cdbe8e.completed.json

Suunnitelmakuitti: https://media.matkakirja.app/audio/receipts/horatio/horatio-9c5b6e4dd75608cdbe8e.planned.json

### Livia

Workflow: `generoi-pulu.yml`; ref: `codex/europe-audio-20260914-r2`.

```json
{
  "repliikit": "ateena-3,sofia-3,istanbul-3,rooma-3,bukarest-3,sarajevo-3,madrid-3,wien-3,pariisi-3,berliini-3",
  "toiminto": "generoi",
  "aani": "piI8Kku0DcvcL6TTSeQt",
  "malli": "eleven_v3",
  "vakaus": "natural",
  "pakota": "ei",
  "retry_reason": "",
  "kuitti": "",
  "haku": ""
}
```

Odotettu erätunnus: `pulu-b3a8d61baa0c4dd24123`

Valmis kuitti: https://media.matkakirja.app/aanet/pulu/kuitit/pulu-b3a8d61baa0c4dd24123.completed.json

Suunnitelmakuitti: https://media.matkakirja.app/aanet/pulu/kuitit/pulu-b3a8d61baa0c4dd24123.planned.json

## Erä 2: lontoo, budapest, dubrovnik, praha, tukholma, kobenhavn, helsinki, tallinna, sevilla, bergen

### Horatio

Workflow: `generoi-luennat.yml`; ref: `codex/europe-audio-20260914-r2`.

```json
{
  "kaupungit": "lontoo,budapest,dubrovnik,praha,tukholma,kobenhavn,helsinki,tallinna,sevilla,bergen",
  "toiminto": "generoi",
  "avaus": false,
  "kaaret": "",
  "kuitti": ""
}
```

Odotettu erätunnus: `horatio-9dfb980a5d394e4f27c2`

Valmis kuitti: https://media.matkakirja.app/audio/receipts/horatio/horatio-9dfb980a5d394e4f27c2.completed.json

Suunnitelmakuitti: https://media.matkakirja.app/audio/receipts/horatio/horatio-9dfb980a5d394e4f27c2.planned.json

### Livia

Workflow: `generoi-pulu.yml`; ref: `codex/europe-audio-20260914-r2`.

```json
{
  "repliikit": "lontoo-3,budapest-3,dubrovnik-3,praha-3,tukholma-3,kobenhavn-3,helsinki-3,tallinna-3,sevilla-3,bergen-3",
  "toiminto": "generoi",
  "aani": "piI8Kku0DcvcL6TTSeQt",
  "malli": "eleven_v3",
  "vakaus": "natural",
  "pakota": "ei",
  "retry_reason": "",
  "kuitti": "",
  "haku": ""
}
```

Odotettu erätunnus: `pulu-36e08a4cb01d19be58fc`

Valmis kuitti: https://media.matkakirja.app/aanet/pulu/kuitit/pulu-36e08a4cb01d19be58fc.completed.json

Suunnitelmakuitti: https://media.matkakirja.app/aanet/pulu/kuitit/pulu-36e08a4cb01d19be58fc.planned.json

## Erä 3: amsterdam, dublin, edinburgh, lissabon, riika, barcelona, firenze, venetsia, marseille, oslo

### Horatio

Workflow: `generoi-luennat.yml`; ref: `codex/europe-audio-20260914-r2`.

```json
{
  "kaupungit": "amsterdam,dublin,edinburgh,lissabon,riika,barcelona,firenze,venetsia,marseille,oslo",
  "toiminto": "generoi",
  "avaus": false,
  "kaaret": "",
  "kuitti": ""
}
```

Odotettu erätunnus: `horatio-f2b265f88906b2110fc6`

Valmis kuitti: https://media.matkakirja.app/audio/receipts/horatio/horatio-f2b265f88906b2110fc6.completed.json

Suunnitelmakuitti: https://media.matkakirja.app/audio/receipts/horatio/horatio-f2b265f88906b2110fc6.planned.json

### Livia

Workflow: `generoi-pulu.yml`; ref: `codex/europe-audio-20260914-r2`.

```json
{
  "repliikit": "amsterdam-3,dublin-3,edinburgh-3,lissabon-3,riika-3,barcelona-3,firenze-3,venetsia-3,marseille-3,oslo-3",
  "toiminto": "generoi",
  "aani": "piI8Kku0DcvcL6TTSeQt",
  "malli": "eleven_v3",
  "vakaus": "natural",
  "pakota": "ei",
  "retry_reason": "",
  "kuitti": "",
  "haku": ""
}
```

Odotettu erätunnus: `pulu-782e0fb303a996a447fd`

Valmis kuitti: https://media.matkakirja.app/aanet/pulu/kuitit/pulu-782e0fb303a996a447fd.completed.json

Suunnitelmakuitti: https://media.matkakirja.app/aanet/pulu/kuitit/pulu-782e0fb303a996a447fd.planned.json

## Erä 4: tampere, vilna, granada, kiova, krakova, moskova, odessa, pietari, varsova, kreeta

### Horatio

Workflow: `generoi-luennat.yml`; ref: `codex/europe-audio-20260914-r2`.

```json
{
  "kaupungit": "tampere,vilna,granada,kiova,krakova,moskova,odessa,pietari,varsova,kreeta",
  "toiminto": "generoi",
  "avaus": false,
  "kaaret": "",
  "kuitti": ""
}
```

Odotettu erätunnus: `horatio-b9abb6bfd06f9fa1003b`

Valmis kuitti: https://media.matkakirja.app/audio/receipts/horatio/horatio-b9abb6bfd06f9fa1003b.completed.json

Suunnitelmakuitti: https://media.matkakirja.app/audio/receipts/horatio/horatio-b9abb6bfd06f9fa1003b.planned.json

### Livia

Workflow: `generoi-pulu.yml`; ref: `codex/europe-audio-20260914-r2`.

```json
{
  "repliikit": "tampere-3,vilna-3,granada-3,kiova-3,krakova-3,moskova-3,odessa-3,pietari-3,varsova-3,kreeta-3",
  "toiminto": "generoi",
  "aani": "piI8Kku0DcvcL6TTSeQt",
  "malli": "eleven_v3",
  "vakaus": "natural",
  "pakota": "ei",
  "retry_reason": "",
  "kuitti": "",
  "haku": ""
}
```

Odotettu erätunnus: `pulu-633016c240390eba4e6f`

Valmis kuitti: https://media.matkakirja.app/aanet/pulu/kuitit/pulu-633016c240390eba4e6f.completed.json

Suunnitelmakuitti: https://media.matkakirja.app/aanet/pulu/kuitit/pulu-633016c240390eba4e6f.planned.json

## Erä 5: sisilia, islanti, alpit, lappi, tromssa

### Horatio

Workflow: `generoi-luennat.yml`; ref: `codex/europe-audio-20260914-r2`.

```json
{
  "kaupungit": "sisilia,islanti,alpit,lappi,tromssa",
  "toiminto": "generoi",
  "avaus": false,
  "kaaret": "",
  "kuitti": ""
}
```

Odotettu erätunnus: `horatio-1cbb66a3f5793fecf7b5`

Valmis kuitti: https://media.matkakirja.app/audio/receipts/horatio/horatio-1cbb66a3f5793fecf7b5.completed.json

Suunnitelmakuitti: https://media.matkakirja.app/audio/receipts/horatio/horatio-1cbb66a3f5793fecf7b5.planned.json

### Livia

Workflow: `generoi-pulu.yml`; ref: `codex/europe-audio-20260914-r2`.

```json
{
  "repliikit": "sisilia-3,islanti-3,alpit-3,lappi-3,tromssa-3",
  "toiminto": "generoi",
  "aani": "piI8Kku0DcvcL6TTSeQt",
  "malli": "eleven_v3",
  "vakaus": "natural",
  "pakota": "ei",
  "retry_reason": "",
  "kuitti": "",
  "haku": ""
}
```

Odotettu erätunnus: `pulu-d84356211af6e2fd5535`

Valmis kuitti: https://media.matkakirja.app/aanet/pulu/kuitit/pulu-d84356211af6e2fd5535.completed.json

Suunnitelmakuitti: https://media.matkakirja.app/aanet/pulu/kuitit/pulu-d84356211af6e2fd5535.planned.json

## Lopputoimitus ja julkaisu

Palauta 10 generointiajon ja 10 kohdistusajon linkit, completed-kuitit, 90 MP3:n määrät/mitatut kestot/tarkistussummat sekä runtime-porttien readback. Kuuntele edustava H/L-otos (myös tunne- ja vakavat kohdat), tarkista ettei tageja lueta ääneen ja ettei äänissä ole katkeamista tai pitkiä tyhjiä jaksoja.

Älä yhdistä tätä tekstihaaraa sellaisenaan mainiin: siellä on vielä vanhat ääni-URLit ja tekstitiivisteet. Julkaisupakettiin on päivitettävä uusien H/L-äänien versionoidut osoitteet, kuittien SHA/tekstidigest-sidonnat ja aidosta kohdistuksesta tulevat eleet. Säilytä Sofia city-4...13 ja muut ääniroolit. Varmista vanhat tekstiodotukset asianmukaisesti päivittämällä testit, älä poistamalla turvaportteja. Fable omistaa lopullisen yhdistämisen/version/julkaisun ja asennetun pelin todellisen kaupungin luenta- ja cue-QA:n.

Kuvat erillisinä: neljä uutta Varsova P1 / Tromssa P1 / Bukarest P1 / Oslo I1 sekä Bergen–Amsterdam kahdeksan kuvan paketti ovat kuvatehtävän paikallisessa katselmuksessa, eivät julkaistuja. Firenzen uusintakuva on pysäytetty, uutta kuvaa ei valmistunut. Äänilupa ei tarkoita kaikkien kuvakandidaattien massahyväksyntää.
