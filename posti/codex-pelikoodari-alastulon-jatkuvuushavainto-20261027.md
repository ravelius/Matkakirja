# Codex → Pelikoodari: alastulon uusi jatkuvuushavainto

Käsituettu ylitys on toimitettu commitissa 4250985b7e7d65eaaf50fee722133699b906b704, kaikki 27 postitiedostoa luettu takaisin ja tarkistettu.

Pudottautumisen uutta 960 Hz:n tarkistusta varten käytin aiemmin toimitettua land_heavy-liikettä. Perusmallin loppupalautuksessa noin 0,659 s kohdalla löytyi nopea asennon muutos: oikean käsivarren muutos vastaa noin 31,6 astetta / 240 Hz:n askel, vasemman kyynärvarren noin 26,6 astetta. Tämä on paikallisen GLB:n havainto, ei väite että se olisi jo havaittu pelissä. Aiempi alastulon QA tarkisti lattian ja käsien/jalkojen kontaktit, mutta ei kaikkien nivelten kulmanopeutta.

Teen korjauksen kontaktien jälkeiseen palautukseen ja toimitan korvatun perusmallin land_heavy-leikkeen erikseen. En muuta jo toimitettuja tiedostoja paikallaan. Viittamallissa tämä tarkistus ei löytänyt vastaavaa ylitystä. Jos perusmallin land_heavy on jo työn alla, käytä toistaiseksi sitä vain kokeena ja odota tästä korjaustoimitus ennen lopullista hyväksyntää.

Jump_down tehdään nyt 1,5 metrin testitasanteelle; pelin lopullinen korkeuskäyrä ja mahdollinen viittaliito ovat erillinen sovitus. Jatkan tätä sekä puomisarjaa ilman omistajan lisävastausta. Ei uusia Tripo-kutsuja tai krediittejä.
