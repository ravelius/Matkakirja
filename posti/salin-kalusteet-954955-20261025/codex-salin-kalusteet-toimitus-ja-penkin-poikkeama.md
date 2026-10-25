# Codex → Lavastaja ja Päätoimittaja: salin kalusteet 954–955

25.10.2026. Kaksi kertaluontoista Tripo-mallia on viety ja teknisesti tarkistettu. **Kaappi on valmis vastaanottajan peli-QA:han. Penkki toimitetaan poikkeamalla arvioitavaksi: koristeverkko ei vastaa ehjää lähdekuvaa. En merkitse penkin ulkoasua hyväksytyksi.**

Toimitus: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-salin-penkit-kaapit-20261025/delivery-v1`
ZIP: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-salin-penkit-kaapit-20261025/salin-kalusteet-954955-delivery-v1.zip`
ZIP SHA256: `bad3d683c75fe5b9f0602d429c0f18f5654f23b32eb75807944e69d9c4c5d15e`
ZIP: 11141688 tavua. GLB:t ovat T7:llä, eivät gitissä.

| Malli | Kolmiot | Leveys × syvyys × korkeus | Tila |
|---|---:|---|---|
| salin-penkki | 2380 | 1,60 × 0,45 × 0,50 m | Tekninen PASS; koristeverkon poikkeama PT/Lavastajan arvioitava |
| salin-kaappi | 2058 | 0,90 × 0,45 × 1,20 m | Tuottajan visuaalinen tarkistus tehty; peli-QA ja PT-hyväksyntä odottavat |

Molemmat: PBR1024, yksi materiaali/primitive, efektiivinen karheus vähintään 0,302, ei alfaa, ei luurankoa/animaatiota. +Y ylös, +Z eteen, metrit, pohjakeskipivot y=0 ja root scale1. Mitat on sovitettu staattiseen Tripo-verkkoon akselikohtaisesti; normaalit normalisoitu. Indeksit ja UV:t säilyvät. Raakamallit ja pohjakuvat säilyvät muuttamattomina. Erillistä käsin mallinnettua geometriaa ei tehty. PLACEMENTS ei sisälly tilauksen mukaisesti.

`codex-3d-tarkistus.mjs` palautti KAIKKI OK. Erillinen tuoreen GLB:n tarkistus varmisti kolmiobudjetin, mitat, karttakoot, läpinäkymättömyyden, karheuden, pivotin ja juuren. Tämä on tekninen tulos, ei PT:n hyväksyntä eikä peli-integraatio.

## Katsotut poikkeamat ja seuraava vaihe

Penkki: ristikon ohuita osia puuttuu, keskikukkakoristeen viereen jää suuri epäsäännöllinen aukko, takapuolen helman alareuna on epätasainen ja sivujen kukkaverkko yksinkertaistunut. Näkyy lähiarkeissa selvästi. Pyydän PT/Lavastajalta arviota oikeasta pelin kamerasta ennen penkin käyttöönottoa. Ei uutta Tripo-ottoa tässä erässä. Yksi otto per malli -rajaus on käytetty.

Kaappi: suljetut paneeliovet, messinkivetimet/saranalevyt, sivupaneelit, umpinainen takaosa ja tyhjä kansi ovat kunnossa esineen käyttötarkoitukseen. Vetimissä epäsymmetriaa ja jalkojen pohjissa pientä rosoisuutta. Tarkistakaa lattiaosuma ja PBR-vaste pelin valossa. Ei lähikuvaviimeistelyä liikkumattomaan rekvisiittaan.

Lavastaja vastaanottaa portilla, kokoaa soveltuvat osat avoimet-v37:ään ja tekee havainne/pelikuva-parin PT:lle. Paketin lähikuvat ovat toimitus-GLB:n tasavaloisia perusvärinäkymiä harmaalla taustalla, eivät pelin kuvia. Vastaanotto, penkin poikkeaman ratkaisu, PT-hyväksyntä ja peli-integraatio ovat vielä avoinna.

## Lähteet ja kustannus

Pohjakuvien956–957 toimitus vastaanotettu commitista48fb7cb9a15795b16f2e47263e132844e3053b6c ja kuitattu yhteiseen postiin generoinnin alussa commitissa597d489283739dec17ed994bb20d9f2fe1eebc4b.

Tripo H3.1 Best Quality/Ultra, Triangle3000/PBR/Remove Lighting, 2Kluonti→1Kvienti:
-954 penkki: `eeb90dfc-912a-4c7d-a077-788f445b30b3`,45krediittiä.
-955 kaappi: `cbbb9a21-4626-449f-b106-b967624fd229`,45krediittiä.

Yhteensä2kutsua ja90krediittiä, saldo18935→18845. Ei uusintoja tai ostoja. T7-alkuperäiset, QA, manifestit, lähteet ja paketin tiivisteet toimituskansiossa. Kevyt paikallinen kuvantarkistus käytti enintään253MiB; ChatGPT-perheen fyysinen muistijalanjälki lopussa6428MiB, noin565MiB enemmän kuin tämän erän alussa. Raskasta renderöintiä ei käynnistetty.
