# Opus 2 → Fable: Merinoston nimiö ei ottanut napautusta (kohta C)

20.9.2026. Haara `opus2-maalehti-viivat` (jatkuu samalla haaralla,
pohja origin/main v1968). Omistajan havainto 19.9.2026 klo 23.31
(iPad, Ranskan lehti): Biskajanlahti-nimiö ei ota napautusta.

## Juurisyy

Vika ei ole iPadissa eikä kosketuksessa: sama toistuu Chromiumissa ja
WebKitissä. Se on zoomissa.

Merinoston **datapiste ja muste ovat eri paikoissa**:

| | paikka |
|---|---|
| data (`js/packs/maastokohteet-fra.js` `laudat.maailmankartta`) | 45,3 N / −3,2 E, lahden ulappa |
| lukittu ankkuri (`js/packs/nostoankkurit-fra.js`) | 45,2 N / −1,14 E, rannikolla |

Poltettu nimiö ja sen osuma-ala ovat ankkurissa. `js/pallolauta/nostot.js`
luki kuitenkin näkyvyyden **datapisteestä**: rivi pudotettiin
`nakyvat`-listalta (ja sen mukana osumalistalta), jos datapiste ei ollut
ruudulla. Ankkuri otettiin käyttöön vasta sen silmukan JÄLKEEN.

Kun kamera zoomasi niin lähelle, ettei kahden asteen päässä oleva
datapiste enää mahtunut ruudulle, nimiö jäi keskelle ruutua mutta
lakkasi olemasta napautettava.

Mitattu (Chromium ja WebKit, 1024 × 1366, kamera ankkurin kohdalla):

| kameran korkeus | ankkuri ruudulla | datapiste ruudulla | osumalistalla |
|---|---|---|---|
| 0,12 | kyllä | kyllä | **kyllä** |
| 0,05 | kyllä | **ei** | **ei** |

Sama mittaus näytti myös, että merkki oli koko ajan merkkiportissa
(89 merkkiä, `portissa: true`) — portti ei siis pudottanut sitä.

## Korjaus

`js/pallolauta/nostot.js`: näkyvyystesti lukee lukitun ankkurin, jos
rivillä sellainen on — siis saman paikan, jonka piirto ja osuma-ala
saavat joka tapauksessa. Rivin `lat`/`lng` asetetaan samalla ankkuriin,
joten osumalaatikko on siellä, missä muste on.

Korjaus koskee kaikkia lukittuja ankkureita, ei vain merinostoja.
Aineistossa on 246 meri-, järvi- ja jokinostoa, joista 30:llä on lukittu
ankkuri (13 maata).

## Todisteet

Mitattu napautus (Chromium, 1024 × 1366, kamera ankkurin kohdalla,
kaksi korkeutta):

| nosto | 0,12 | 0,05 |
|---|---|---|
| Biskajanlahti (FRA) | kortti aukeaa | kortti aukeaa |
| Välimeri (FRA) | kortti aukeaa | kortti aukeaa |
| Pohjanmeri (DNK) | kortti aukeaa | kortti aukeaa |
| Itämeri (DNK) | kortti aukeaa | kortti aukeaa |

Ennen korjausta korkeus 0,05 antoi "ei osumalistalla" kaikilla neljällä.

Vartio: `tools/savukkeet/savuke-nostoklikkaus.mjs` väite 6 — kamera
ajetaan ankkuriin, tarkistetaan että **datapiste on ruudun
ulkopuolella** (muuten väite ei mittaisi tätä sääntöä) ja että nimiön
napautus avaa juuri Biskajanlahden kortin.

`node --test tests/*.test.mjs`: 3709 / 0.
