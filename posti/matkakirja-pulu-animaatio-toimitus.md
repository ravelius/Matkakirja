# Pulun viiva-animaatio — ensimmäinen toteutus 9.9.2026

Fable: käyttäjä on valtuuttanut liittämään tämän peliin. Toteuta kytkennät nykyiseen nappiin, puheeseen ja chattiin. Tarkista ensin selaimessa mobiilikoko, liikkeet, klikkaus, modaalit ja vähennetty liike. Sen jälkeen vie peliin ja kuittaa toimitus omaan postiin. Älä odota uutta omistajan lupaa tälle tekniselle liitännälle.

## Tiedostot

- `posti/pulu-animaatio.mjs`: riippumaton SVG + Web Animations API -komponentti.
- `posti/pulu-animaatio-kokeilu.html`: itsenäinen kokeilusivu, moduulin sama lähde mukana. Puhetestin äänitiedosto on tarkoituksella äänetön.
- Aiempi `matkakirja-pulun-viiva-animaatio.md`: laajempi suunnitelma ja 52 täyterepliikin liike-ehdotukset. Kaikkia ei ole tässä toteutettu.

## Liitäntä

Siirrä moduuli pelin JS-hakemistoon ja importoi `createPuluAnimator`. Anna olemassa oleva `.pollo-nappi.pollo-kelluu`-elementti: `const liviaMotion = createPuluAnimator(button)`. Älä luo toista klikattavaa nappia. Nykyinen ikoni piilotetaan vain komponentin eliniäksi; vanha näkyvyys palautuu destroy-kutsulla. Napin nimi tulee vaihtaa Livian chattia kuvaavaksi nykyisessä käyttöliittymässä.

Komponentti ei muuta audiota eikä käynnistä verkkopyyntöjä. Kutsu `liviaMotion.bindAudio(audio)` olemassa olevan `soitaLivianAani(...)`-funktion palauttamalla HTMLAudioElementillä (tai null). Liike seuraa playing/pause/ended/error/emptied-tapahtumia; tämä on yksinkertainen puheliike, ei foneemikohtainen huulisynkka. Säilytä äänen nykyiset paikka-, mykistys- ja luentaehdot. Älä aloita liikettä arvioidun tekstipituuden perusteella.

Kun chat valitsee täyterepliikin, anna saman pyynnön tunniste `waiting({requestId, motionId})`. `motionId:'owl'` on lähtö pöllöltä kysymään; `'crumbs'` on murujen nokkiminen; muut arvot tuottavat rauhallisen pään eleen. Valitse liike juuri valitun täyterepliikin metatiedosta, älä toisella satunnaisvalinnalla. Pöllö-liikettä ei saa käyttää yleisenä liikkeenä kaikkien repliikkien kohdalla. Ensimmäinen valmis vastaussisältö näytetään välittömästi, ja samalla `answer(requestId)` palauttaa linnun noin 280 millisekunnissa. Vanhan pyynnön answer ohitetaan. Pyyntöjen peruutuksessa kutsu cancel.

`arrival()` näyttää kerran lyhyen kohtauksen: pulu työntää vanhan pöllön kuvakylttiä sivuun ja asettuu paikalle. Kyse on kyltistä, ei elävän pöllön tönimisestä. Käytä nykyistä ensisaapumisen kerran-lippua. Kaanoni: pöllö on matkoilla ja Livia tuuraa. Säilytä nykyisen paljastuksen järjestys suhteessa isoisän luentaan. Puheliike voi keskeyttää saapumisen: jos haluat koko alkuliikkeen, ajoita se ennen ensimmäistä ääntä, enintään 1,45 sekunnin avauksena. Älä kytke väärän kaupungin Ateenaan sidottua äänitettä.

`crumbs()` = erillinen 1,7 sekunnin muruhetki. `idle()` palauttaa lepoon. `setContext({allowIdleFidgets:true})` sallii pieniä joutoeleitä. Oletus false; pidä false kirjoitettaessa, luettaessa, selattaessa, luennan aikana ja kuvakarusellissa. Tämä ensimmäinen toteutus sisältää vilkutuksen ja pienen pään kallistuksen, ei vielä kaikkia tunteita, sulkimista tai sääefektejä.

`reposition()` päivittää ankkurin napin todellisesta suorakulmiosta. Resize ja scroll seurataan, mutta kutsu tätä myös pelin vaihtaessa napin CSS-sijaintia ilman resize/scroll-tapahtumaa. Komponentti käyttää kiinteää läpinäkyvää 220×180 piirtoaluetta (ei vie asettelutilaa) ja napissa noin 30 pikselin lintua. Ympäristön kerroksien tulee pitää kuvat ja modaalit linnun yläpuolella. Irrota komponentti `destroy()`-kutsulla napin purkamisen tai sellaisen täysruutunäkymän ajaksi, jossa pulu ei näy; luo uudelleen palatessa. Pointer-events on none, joten piirros ei estä karttaa tai nappia.

Vähennetty liike estää liikeanimaatiot. Taustavälilehdellä liikkeet pysähtyvät. Destroy poistaa kuuntelijat, ajastimet ja animaatiot. Värit voi antaa `{ink,paper}`-asetuksilla.

## Tarkistukset ja rajat

JavaScriptin syntaksi tarkistettu Node-ajoympäristössä. Toimintatesti kevyillä DOM/Audio-testikorvikkeilla läpäisi: uuden/vanhan chatpyynnön erottelu, välitön paluu, peruutus, aidot audioeventit, vanhan audion irrotus, muruodotuksen paluu sekä destroy-siivoaminen. Testi ei todista selaimen SVG-piirtoa tai Web Animations API -renderöintiä.

Selaimen turvarajoitus esti paikallisen HTML-esikatselun avaamisen. Visuaalinen ja mobiiliselaimen tarkistus on siksi vielä Fablella ennen julkaisua. Kokeilusivun painikkeilla voi käydä kaikki viisi liikettä sekä keskeytykset läpi. Tarkista erityisesti SVG-transformit Safari/iOS:ssa, pienen linnun luettavuus ja se, ettei laajeneva piirros peitä chatin tekstiä. Tämä on toteutettu ensimmäinen kokeilu, ei vielä väite pelissä toimivasta integraatiosta.
