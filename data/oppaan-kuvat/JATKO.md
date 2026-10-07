# Oppaan kuvahaku: jatkokohta (Sisältökirjuri 6.10.2026, tilinvaihto)

Vaihe 1 (pelin 266 paikkaa): valmiita tiedostoja 154 / 266 (validoitu `tarkista --kaikki`).

Euroopan 51 on valmis ja PR:ssä #4078. Katkaisun hetkellä ajossa olleet agentit (tiedostot voivat olla valmiita tai puuttua; tarkista `ls data/oppaan-kuvat/kaupungit`): taipei hongkong jakarta manila borneo sumatra valparaiso manaus caracas salvador portoalegre asuncion panama guatemala nuuk anchorage monterrey merida winnipeg stjohns

Aloittamatta (105 paikkaa), ryhmiteltynä alueittain (jokainen ryhmä = yksi Sonnet-agentti, ~6 paikkaa):

- Afrikka: timbuktu kilimandzaro viktorianputoukset namib angola tanganjika sierraleone
- Afrikka: sthelena kimberley kappalmas viktoria gao kamerun ahaggar
- Afrikka: mosambik darfur tshadjarvi rashafun orjarannikko bahrelghazal murzuk
- Afrikka: alkufra kongo madagaskar sahara lalibela suakin tanger
- Lähi-itä: halab damaskos riad tabriz teheran isfahan
- Lähi-itä: sana aden salalah mosul izmir ankara
- Venäjä ja Keski-Aasia: jekaterinburg novosibirsk astana irkutsk jakutsk
- Venäjä ja Keski-Aasia: magadan kamtsatka sahalin vladivostok samarkand
- Pohjois-Amerikka: whitehorse yellowknife iqaluit santafe sitka bermuda churchill
- Pohjois-Amerikka: appalakit labrador nome managua sanjuan yellowstone grandcanyon
- Pohjois-Amerikka: mountrushmore hawaii
- Oseania: townsville norfolk sepik broome nullarbor geraldton
- Oseania: exmouth kalgoorlie birdsville mountisa cooberpedy noumea
- Oseania: uluru bali milfordsound
- Etelä-Amerikka: salta antofagasta puntaarenas santacruz iquitos falkland caphorn
- Etelä-Amerikka: robinsoncrusoe boavista cayenne santarem joaopessoa bananal macapa
- Etelä-Amerikka: campogrande sanambrosio portovelho saoluis puertomontt iguazu titicaca
- Etelä-Amerikka: ouropreto galapagos machupicchu

## Jatkamisohje
1. `git fetch origin main`; työkalut ja ohje: `tools/oppaan-kuvat.mjs`, `data/oppaan-kuvat/AGENTTIOHJE.md`, `data/oppaan-kuvat/MUOTO.md`.
2. Käynnistä Sonnet-agentteja (Agent, model sonnet; ei Fablea) ryhmittäin, enintään 6–7 rinnakkain (Wikimedia antaa 429, jos enemmän). Prompt: "Lue AGENTTIOHJE.md ja toimi sen mukaan (kohdat 4c ja 5). Tee paikat: <id:t>". Lisää alue- ja ID-selitykset (esim. xian = Xi'an, kanton = Guangzhou, alueille kohdelista).
3. Ennen PR:ää: `node tools/oppaan-kuvat.mjs tarkista --kaikki`, `node tools/oppaan-kuvat.mjs kokoa`, commit ja push. Pelikoodari ajaa koonnin `tools/pollo/tee-opas-kuvat.mjs --sisalto data/oppaan-kuvat/oppaan-kuvat.json`.
4. Vaihe 2 (162 kaupunkia: `data/oppaan-kuvat/kaupungit-vaihe2.json`, Codexin ERÄ 1B) tehdään vasta vaiheen 1 jälkeen. Vaiheen 2 tiedostot samaan kaupungit-kansioon (id = vaihe2-id).
5. Tunnetut huomiot: `peruste` "pelin nosto" -väitettä validointi ei tarkista (agentit ovat käyttäneet sitä kartan kohteille ja pelin kuvissa esiintyville paikoille; tarkista otoksin); sitelinks-raja 13; älä listaa katsomattomia kuvia.

