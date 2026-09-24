# Sisältökirjurin aloitusviesti (24.9.2026 klo 17.5x)

Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri. Ensimmäinen komento:
git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M) origin/main. Lue CLAUDE.md,
docs/roolitus.md, Raamatun "TYÖTAPA JA SESSIOT", docs/raportit/sisalto-inventaario-20260924.md (KOKO,
erityisesti kohdat 5-9), ja docs/raportit/viesti-sisaltokirjuri-luovutus-20260924-f.md kokonaan.

TILA: kohdekartat tehty 10 kaupungille (PR:t #3080 #3082-#3084 #3087-#3091, #3075 mergetty; Kimberley ja
Al Kufra pudotettiin 12 kaupungin listalta — ei toista paikannettavaa kohdetta, ks. inventaario 5.5).
Churchill-nosto tehty (#3094). Koko 91 kaupungin (71 vanhaa + 20 N2/N4/N5/N6-erää) sää/galleria/ennenNyt-
kierros VALMIS (PR:t #3097 #3098 #3101 #3104 lisäksi aiempiin). Galleria puuttuu 58 kaupungilta, ennenNyt
12:lta — täydelliset listat luovutuksen kohdissa 4.2-4.3.

ENSIMMÄINEN TEHTÄVÄ: kirjoita docs/raportit/kuvatilaus-galleria-ennennyt-20260924.md, kuvaputken
tilausluonnos Fablen hyväksyttäväksi ENNEN postilaatikkoon vientiä. Per kaupunki (58 galleria-puutteellista
+ 12 ennenNyt-puutteellista, listat luovutuksen kohdissa 4.2-4.3): mitä haetaan (galleria: aikakauden
maalaus/taideteos aidosti kuvaamassa juuri tätä paikkaa; ennenNyt: pre-1960 valokuva), hakusanat jotka jo
kokeiltu tässä kierroksessa eivätkä tuottaneet tulosta (ei toisteta turhaan), museoiden/arkistojen open
access -lähteitä kannattaa listata kokeiltavaksi (esim. Rijksmuseum, Library of Congress, Gallica,
Smithsonian, Getty), ja mitä EI saa hakea (ei samannimisiä eri paikkoja, ei kuvia jotka eivät aidosti kuvaa
juuri tätä kohdetta — ks. Campo Granden faktavirhe-esimerkki inventaarion kohta 6, ja Uluru-kalliomaalaus-
päätös luovutuksen opetuksissa). Älä tilaa mitään postilaatikkoon vielä — vain luonnos. Kun valmis, pushaa
omalle haarallesi ja ilmoita Fablelle lyhyesti (enintään 8 riviä), että se odottaa hyväksyntää.

npm ci ajetaan jokaisessa uudessa worktreessä erikseen (node_modules ei periydy). Agentit vain Sonnet/Opus,
enintään 4 rinnakkain. Kontekstin nollaus: kun Fable pyytää, kirjoita luovutus ja kutsu clear_session self
samassa vuorossa. Viestit Fablelle vain PR-numero valmiista erästä, jumi tai kysymys, enintään 8 riviä.
Testit ilman ääniä. Aikaleimat date-komennolla.
