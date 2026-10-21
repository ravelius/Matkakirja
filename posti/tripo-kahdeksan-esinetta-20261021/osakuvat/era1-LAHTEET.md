# Kuvapohjien lähteet ja tuotanto

Tilaus #799: posti/paatoimittaja-codex-kuvat-8esinetta-osakuvat-20261021.md, commit54e64edb220c54f32aadc1e44ab2aabda0ae2217. Tripo3D:n osasuunnitelma03f3376639d7736feac1aa0521e16326748289fa luettu kokonaan. Hyväksytyt kuusi-lattiaesinetta.png ja maisemasermi.png toimituksesta8071bbe3eb6891d41a12452586ac8aec959e586d tarkistettiin alkuperäisinä; ne ovat omistajan hyväksymät AI-suunnittelukuvat. Ei Googlen laattoja, ulkopuolisia valokuvia, museoattribuutiota tai kopioituja suojattuja teoksia.

Kukin toimitettu PNG on kokonaan uusi sisäisen imagegen-työkalun tuotos; hyväksyttyjä kuvia käytettiin vain muodon/värin/aiheen referenssinä. Ei rajauksia vanhasta esinekoosteesta lopputuloksiksi, ei osittaisia luovia korjauksia eikä kuvasommittelua koodilla. Natiivin kuvan tavut säilytettiin muuttamattomina. Tarkat argumentit PROMPT-SET.jsonissa; lähdereferenssien tiedot tuotantojuuren ROOT-READY.jsonissa.

Root tarkisti kuvat itse: yksi pyydetty osa, oikeat värit/muoto, koko siluetti, vaalea tausta, ei tekstiä/muita esineitä. Maalaustekstuurin kohtisuora kamera on UV-käytön vaatima poikkeus osakuvien3/4-kulmasta. Tämä on kuvapohjien QA, ei 3D-rakenteen tai pelikäytön hyväksyntä.

Työnjako #797 säilyy: Matkakirjan kuvat tekee vain kuvat/tekstuurit/havainnekuvat; Tripo3D tekee mallit. Tripo-kutsuja tässä erässä0, ei R2/Unity/main/merge/julkaisutoimia. Lautaspöytä odottaa erillistä omistajapäätöstä eikä kuulu tämän erän tuotantoon.
