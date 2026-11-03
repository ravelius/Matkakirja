# Pelikoodari: luovutus 3.11.2026 klo 18.50 – juna 218

Edellinen: -20261103-1825 (9ef4d0f6c + db9d9d1b3), voimassa ellei alla toisin. Syy: kontekstiraja 25 % (7.37) ennen isoa
kytkentää (arkihahmot). Proto-haarat paikallisia (repo /Users/Shared/Claude/proto-3d/Matkakirja-proto).

## Tehty 18.25–18.50
- Keisarin havainnekuvat: media 200 × 5 tarkistettu (JU vei 18.17).
- **LATAUSKUVAN ELOKUVAOTSIKKO (kohta 4) VALMIS**: Codex #1867 rivit koottu kahdeksi PNG:ksi ilman skaalausta (pysty 3000 × 625,
  vaaka 3000 × 499 tiiviillä riviväleillä), media juoksupeli/latauskuva-otsikko-1867-20261103/ (PT kuittasi, JU vei 18.32).
  Proto **pelikoodari/latauskuva-otsikko-218** (a592f6e28:n päällä, wt /Users/Shared/Claude/wt/proto-pelikoodari-latauskuva):
  4cb7815df (OtsikkoUrl + uusi OtsikkoVaakaUrl, PystyOtsikko {1120/941, 0.5, 356.7/1672} enintään 0,92 × näkyvä leveys) ja
  db339f555 (PT 18.4x: VaakaOtsikko 1260/2560, keskiX 1280, keskiY 143/1180 → yläreuna 38 px, hattumaskin vara 13 px).
  PT kuittasi pystyn ja vaaka v2:n. Iso pakettiin ei mahtunut (ristiriita JuoksupeliNakyma.cs) → yhdistetty am-linjaan:
  **horisontti-218am kärki 1ab6dfa38** (merge; Unity-tarkistus 0). Tarkistuskuvat /Users/Shared/Claude/proto-3d/lokit/pk-latauskuva-otsikko-20261103/.
  Kokoamisskripti (ajetaan uudelleen tarvittaessa): pysty Codexin x 67, y 240 (esikatselu 250, tupsu 14 px pisteen alla).
- **Keisarin nosto tekstikorjaus** (KK 18.47): keisari-havainne-218 **00686cbef** ("ensin Zhangin puutarhassa ja sitten Hiljaisessa
  puutarhassa"; kuva d "Puyi Hiljaisessa puutarhassa Tianjinissa, jossa hän asui 1929–1931."), kielivahti ok. JU yhdisti iso
  pakettiin a92302399 (laitteelle seuraavassa käännöksessä).
- **TRIPON ARKIHAHMOT 73e82f87f ARVIOITU** (posti 9506cfe42: hyväksytty pelikytkentään; SHA 167/167; 4 hahmoa, kaikilla 65 niveltä
  samassa järjestyksessä kuin eunukki-1 hahmot-v6; leikkeet idle 2,0 walk 1,4 startle 1,0 startle_idle 2,0 walk_empty 1,4; lakaisija
  sweep; vedenkantaja fill_right/fill_left 2,6 + idle_after_fill/walk_after_fill; tavara-solmu; kolmiot rajoissa). Huomiot:
  palvelijattaren maljakko ei näy takaa, posliinisirpaleet valkoiset → PT haluaa ne pelikuvapariin.
  Media-paketti /Users/Shared/Claude/proto-3d/_valmiit/juoksupeli-arkiset-v1-vienti-20261103/ (juoksupeli/arkiset-v1/: 11 GLB +
  RUNTIME-CONTRACT.json + WATER-POUR-CONTRACT.json) **PT kuittasi, JU vie**.

## SEURAAVA
0. **ARKIHAHMOJEN KYTKENTÄ (PT 19.2x, ei aloitettu koodia).** OMISTAJA 18.45 (PT, sitova): palatsin malli palvelee myöhemmin myös
   elävää historiaosuutta → pelilogiikka, reitti, esteet ja kamera omaan kerrokseensa, ei LAV:n rakennusmalleihin; Tripon hahmot ja
   esineet YLEISKÄYTTÖISINÄ. Suunnitelma:
   a) Yleinen rakentaja (ei juoksupelin nimissä, esim. Scripts/Arkihahmot/ArkiHahmot.cs): lataa arkiset-v1/ (JuoksuHahmot.Hae +
      Task.Run DioraamaGlb.Lue). HUOM: JuoksuHahmot.Valmista ottaa vain YHDEN luurankoverkkosolmun; uusissa malleissa ~15
      ihonverkkosolmua (kaikki skin 0) + staattiset verkot tavara-solmun alla → yhdistä kaikki skin-solmujen Osat yhdeksi
      SkinnedMeshRendereriksi ja staattiset verkot MeshRenderereinä omiin solmuihinsa. Palauta JuoksuHahmot.Hahmo (kentät internal,
      sama assembly: Soita/Aseta toimivat). Skaala 1 (metrit), malli Euler(0, KaantoAste, 0) kuten Rakenna (Hahmot:372).
   b) Irrotus RUNTIME-CONTRACTin mukaan: startle 0,40 s → tavara-solmun maailmamatriisi @ inverse(standaloneRootLocal) (vedenkantaja
      skaala 0.988, muut identiteetti) → piilota upotettu tavara, irrallinen tavara-*.glb putoaa (yksinkertainen ballistinen lento),
      maahan osuessa jäänne (jaanne-posliini: sirpale-1…8 sinkoutuvat lyhyesti; ruoka; vesi + lätäkkö), luuta jää maahan.
      startle → startle_idle; walk_empty. Särkymisääni Kerta()-kutsulla (JuoksupeliNakyma:1358), EI s.Tapahtumat-listaan → ei houkuttele.
   c) Pelilogiikka puhtaana Peli/Juoksupeli/JuoksuPalvelija.cs (reitti S/Sivu-koordinaateissa, säikähdys kun Puyi ≤ ~1,2 m tai
      osuu) + testit Peli-testit/Testit (mallina VesiastiaKaistaesteena JuoksuV4Testit:367); paikat kuten vesiastia Sisalto()
      (JuoksuV4:1147, o.Vaylia ≥ 2), lakaisija/vedenkantaja aukioille. Näkymä partial JuoksuV4Maailma.Palvelijat.cs, kutsu
      Maailma:1270 PaivitaAarteet(s):n jälkeen; isä-GameObject kuten PaivitaOviEunukki (Maailma:2830–2883: U(), Yaw(), Maassa()).
      QA-lippu kuten case "vesiastiat" (JuoksupeliNakyma:1923). Oletus pois, kunnes PT kuittaa pelikuvaparin.
   d) Pohja: horisontti-218am (1ab6dfa38) tai uusi haara siitä; Unity-tarkistus + Peli-testit (bash Peli-testit/kaanna.sh).
   e) Pelikuvapari PT:lle JU:n vuorolla: hahmot pelikamerasta, maljakko takaa, sirpaleiden väri; vedenkantajan vesi WATER-POUR-CONTRACTista myöhemmin.
1–3. am/al-tulokset ennallaan kuten luovutuksessa -1825 (taso1b vaiheloki 5aef4b1a2 ja mika 8b9bdda4c; am ajaa horisontti-218am:n
   kärjen, nyt 1ab6dfa38 = + latauskuvan otsikko → tarkista latauskuva myös am-videosta).
5. Edellisen luovutuksen kohdat 4–7 ennallaan (Codex-toimitukset, Editor-työkalut kivi-216:een, taso1b musiikkirivit).
6. Postiskripti: /private/tmp/…/scratchpad/posti-pk.zsh ei säily → JU:n malli /Users/Shared/Claude/julkaisija-tyokalut/posti.zsh,
   oma wt /Users/Shared/Claude/wt/pelikoodari-postilaatikko.
7. Checkout /Users/Shared/Claude/Matkakirja-pelikoodari: luovutushaara koti/pelikoodari-20261103-1850.
