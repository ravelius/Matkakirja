# Codex → Pelikoodari: kuusi rimpuiluliikettä takaa otettuun pitoon, 27.10.2026

Lisätilaus1034, lähde 0d4eef81cecd4e543191def089de2436c4f8a5bb. Molemmat Puyit sekä vartija ja kolme eunukkia: 8 synkronoitua paria, 10 kumulatiivista GLB:tä. Tämä erä on **takaa kiinnioton pitoasentoon**; edestä/sivulta alkavat rimpuilut ja muu parkour jatkuvat erikseen. Ei uusia Tripo-/kuvakutsuja eikä krediittikuluja.

Paikallinen paketti: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/struggle-back-review-v1/`.
GLB:t kansiossa `models/`. MANIFEST.json antaa jokaisen tiedoston SHA256:n, suhteellisen juurisiirron, asettelun ja parin. SHA256SUMS kattaa myös kuva- ja QA-aineiston. GLB:t eivät ole gitissä.

| Puyi | Vartija | Kesto | Toisto |
|---|---|---:|---|
| struggle_1 (käsivarren riuhtaisu) | hold_struggle_1 | 1,2 s | silmukka |
| struggle_2 (potkiminen) | hold_struggle_2 | 1,2 s | silmukka |
| struggle_3 (kiemurtelu) | hold_struggle_3 | 1,3 s | silmukka |
| struggle_4 (yhdistelmä) | hold_struggle_4 | 1,5 s | silmukka |
| struggle_give_up (lannistuminen) | hold_struggle_give_up | 1,5 s | kerran, pidä loppuasento |
| struggle_free (irtautuminen) | hold_struggle_free | 0,6 s | kerran, juoksuun |

## Kytkentä

Sama kello molemmille. Sisääntulo on `caught_hold_back` / `hold_back` vaihe0. Neljän silmukan molemmat päät ovat täsmälleen tämä pitoasento. Vaihda satunnaissarja silmukan rajalla; pelaajan 10 napautuksen/1–5 s aikarajan kesken silmukan tapahtuva keskeytys tarvitsee pelissä kontaktin säilyttävän siirtymän tarkistuksen. Pelimoottorin IK:ta ei ole oletettu tai lisätty.

Käytä MANIFEST.pairs.actorPlacement-juuria ja samaa yhteistä glTF→Unity-muunnosta kuin takaa-kiinniotossa. Älä peilaa hahmoja tai lisää toista siirtoa. `struggle_free`: juuret paikallaan 0–0,18 s; sen jälkeen Puyin Z-siirto = `0.5*(5/0.42)*(t-0.18)^2` välille0,18–0,6 s, X/Y=0. Lopussa Z=1,05 m ja nopeus5m/s. Vartijan juuri pysyy pitoasennossa. Ote hellittää0,18–0,32 s. Puyin loppuasento käyttää lähdejuoksun vaihetta0,6 s. Jatka samasta vaiheesta/nopeudesta ja tarkista blend pelissä. Juuren etenemiskäyrää ei ole leivottu GLB:hen; älä liikuta sitä kahdesti.

## Tarkistus ja rajat

48 leikeparia tarkistettu GLB-viennin jälkeen: silmukat ja luovuttaminen120Hz, irtautuminen240Hz. Kaikki läpäisivät äärellisyyden, aikajärjestyksen, quaternionit, otteen ja lattian alitusrajan. Suurin kämmenen otteen vertailupisteen poikkeama0,647 mm; alin koko verkon piste+0,695 mm. Pitoon plantattujen vartijajalkojen nivelpisteet pysyvät paikoillaan mittaustarkkuudella. Tämä ei todista kaikkien sormien/vaatteiden kolmioiden törmäyksettömyyttä tai kaikkien liikesiirtymien liukumattomuutta.

`qa/` sisältää4 ruutua/leike molemmille Puyille eunukki1-parissa, lisäksi kuuden avainasennon arkit sekä kaikkien8parin numeerisen tarkistuksen. Omat geometriat, tekstuurit, luurangot ja aiemmat leikkeet säilyvät. Myös aiemmat takaa/edestä/sivulta kiinniotot sekä eunukki1:n hyväksytty peek_call1080 säilyvät kumulatiivisesti.

**Paikallinen tekninen QA läpäisty; uusi rimpuiluerä odottaa Pelikoodarin pelikuva-, kontakti-, siirtymä- ja vaatearviota.** Viittalähteen avoimia täyden hiha/kainalokorjauksen rajoja ei tällä toimituksella kuitata valmiiksi. Aiemmin hyväksytyt kaksi eunukki1:n takaa-kiinniottoparia eivät automaattisesti hyväksy näitä uusia liikkeitä.

Jatkan muiden valtuutettujen liikkeiden työstöä. Kerro erityisesti, haluatko 10 napautuksen irtautumisen keskeyttävän silmukan heti vai seuraavasta turvallisesta rajasta; teen toistaiseksi rajalta vaihtuvan referenssin, jotta ote ei napsahda.
