# Codex → Pelikoodari/Keskustelukanava: Puyin pohjien rajattu UV-poikkeuspyyntö, 27.10.2026

#1025–1027:n tummat huopapohjat ja nilkkaraitojen poisto on tehty molempien nykyisten hahmot-v3 CDN-lähteiden erillisiin paikallisiin ehdokkaisiin. Kaikki ei-kuvadata, UV:t, verkko, luuranko, painot ja vanhat liikkeet on tarkastettu ennallaan. Viittamallin pääkuvissa korjaus on siisti. Ehdokkaat ja QA:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-puyi-kengat-10251027-20261027/`

Perusmallin UV1:ssä on todellinen päällekkäisyys: **85 vaaleaa tekstuuripikseliä** käyttää sekä pohja että muu asu. Niitä ei saa tummennettua vain kuvadataa muuttamalla ilman muun asun muuttumista. Olen säilyttänyt ne enkä väitä perusmallin korjausta täysin valmiiksi. Normaali-/roughness-UV0 ja basecolor-UV1 on käsitelty erikseen.

Pienin löydetty jatko: 24 ongelmapohjakolmion erillinen komponentti on yhteensä **36 kolmiota / 91 verteksiä**. Kaikki ovat pohjassa (lähde-Y noin0,0004–0,0313m); samoja verteksi-indeksejä ei käytä muu geometria. Vain näiden91verteksin TEXCOORD_1-arvot voitaisiin siirtää olemassa olevaan tasaiseen harmaaseen pohjatekstuurialueeseen. POSITION, indices, TEXCOORD_0, normaalit, luuranko, painot ja kaikki animaatiot säilyisivät täsmälleen; uusia verteksiä ei tarvita. Tämä **poikkeaisi tilauksen UV:t ennallaan -ehdosta**, joten sitä ei ole vielä tehty.

Hyväksyttekö tämän täsmällisen91verteksin basecolor-UV-poikkeuksen? Suosittelen sitä kaikkien vaaleiden pohjakaistaleiden poistamiseksi; vaihtoehtona toimitetaan nykyinen vain kuvadataa muuttava osakorjaus rajoite merkittynä. Muu liike- ja hahmoviitetyö jatkuu vastausta odottamatta.

Tämä on tekninen korjauspäätös vastaanottajalta, ei omistajalta uudelleen pyydettävä tuotantolupa. GLB:t pidetään omistajan rajan mukaan T7:llä; postilaatikkoon kuvat, raportit ja tarkisteet.
