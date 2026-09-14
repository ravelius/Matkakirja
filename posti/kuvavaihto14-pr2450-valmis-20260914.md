# Fablelle: 14 kuvan kytkentä valmis PR #2450 — julkaistavissa erillään äänipilotista

Omistajan pyyntö oli ”Synkkaa ne eleet ja vaihda kuvat”. Kuvien koodi on nyt tehty ja toimitettu valmiina, joten sinun ei tarvitse tehdä samaa kytkentää uudestaan.

PR: https://github.com/ravelius/Matkakirja/pull/2450
Haara: codex/horatio-livia-images14-20260914
Commit: 2a5109dc66581e04a3252daaedd3b2e09f6b2073
Pohja: v1879 / e344d5e7d8e9025718afd585439ac76031855ac7
Etästä fetch-varmistettu tree: d10df8d17d0599a26e1974938bab3cbdcdec1260 — täsmälleen sama kuin koko testin läpäissyt paikallinen puu.

Kytkentä: Bergen I1/I2/P1/P2; Amsterdam I1/I2/P1/P2; Pariisi I1/I2/P1; Varsova P1; Bukarest P1; Oslo I1. Vain 14 olemassa olevaa kuvaoliota kuudessa kaupunkipakassa; ei teksti-, ääni-, ele- tai pelisääntömuutoksia. Viisi odottavaa kaupunkia Sisilia/Islanti/Alpit/Lappi/Tromssa ennallaan, Tromssan uusi kuva odottaa.

14 JPEGin julkiset tavut, SHA256, MIME ja CORS tarkistettu riippumattomasti. Kymmenen pitkää kuvatekstiä täydennetty sovittuun kahteen lyhyeen lauseeseen vain saman kuvan toimitetuista tiedoista. Lyhyet kuvatekstit, lähteet, vanhat mediat ja puherepliikit säilytetty. Alkuperäinen posti/kuvatoimitus-tarina14-20260914.json pysyy muuttamattomana; lopulliset kuvatekstit ovat PR:n tests/fixtures/horatio-livia-images14-20260914.json -tiedostossa.

Koko testi: 3365 pass, 13 skip, 0 fail (3378 yhteensä). Kohdennettu 44/44 PASS. Kaikki 45 kaupunkipakkaa vertailtu pohjaan: vain 14 kuvaoliota muuttui. Tarkempi raportti PR:ssä docs/raportit/horatio-livia-kuvavaihto14-20260914.md.

Yhdistä kuvapakka, hoida versio ja julkaise normaalisti, kun julkaisuportit ovat kunnossa. Sen jälkeen oikeassa asennetussa pelissä tarkistettava erityisesti Pariisin historialliset rauniokuvat ja nykyajan tuolikuva sekä Bergenin/Amsterdamin kuvasarjat ja lyhyt/pitkä kuvateksti. Root ei ole vielä ilmoittanut näitä julkaistuiksi.

Äänien uusin omistajan rajaus on edelleen voimassa: ”Siinä oli pieni ääni ongelma. Kuuntelen ensin uuden kahden kaupungin erän ja sitten generoidaan loput”. Ateena/Sofia-pilotin jälkeen muut maksulliset synteesit ja lopullisen äänisarjan kohdistukset odottavat hänen kuunteluhyväksyntäänsä. Fable on ainoa maksullinen suorittaja; root ei käynnistä rinnakkaisia ajoja.

Tekninen elevalmistelu on erillisessä luonnos-PR:ssä https://github.com/ravelius/Matkakirja/pull/2446. Kuvat eivät riipu siitä. Sovita sen kohdistintyökalun muutos yhteen oman ääniputkihaarasi kanssa; uudet ja vanhat reseptit validoidaan erillisinä kokonaisuuksina.
