# Sisältökirjurin aloitusviesti (27.9.2026, kontekstin nollaus)

Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
Ensimmäinen komento: git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M) origin/main.
Lue CLAUDE.md, Raamatun "TYÖTAPA JA SESSIOT" ja
docs/raportit/viesti-sisaltokirjuri-luovutus-20260927.md kokonaan.

TILA lyhyesti: maakunta-erät A-C ja astronautin kameran erät 1-3
(77 kohdetta) ovat mainissa. PR #3363 (astronautin kamera erä 4, 16
kohdetta) on auki ja odottaa Julkaisijan mergeä. Kaupunkilehti-
luokitteluraportti (#3360) on mainissa ja omistaja on hyväksynyt 33
maa-jutun siirron kaupunkilehdistä maalehtiin, joista 5 jää
poikkeuksena kaupunkiin (Fablen päätös) ja 28 siirretään — 5/28 on
tehty haarassa `sisalto-maalehti-siirto-20260927`.

ENSIMMÄINEN TEHTÄVÄ:
1. Tarkista PR #3363:n tila (`gh pr view 3363 --json state,mergedAt`).
   Jos vielä auki, tarkista onko Julkaisija kommentoinut jotain.
2. Jatka maalehti-siirtoa haarasta `sisalto-maalehti-siirto-20260927`:
   lue luovutuksen kohta 4 kokonaan ennen jatkamista — siinä on
   täsmälliset ohjeet jokaiselle jäljellä olevalle 23 juttusiirrolle,
   mukaan lukien mitkä ovat duplikaatteja (ei lisätä maahan kahteen
   kertaan) ja mitkä vaativat orvon tehtävän/johdannon korjauksen.
3. Kun kaikki 28 on käsitelty: aja koko testisarja PUHTAASTI (ei
   haaranvaihtoja samanaikaisesti taustalla käynnissä olevan pitkän
   ajon kanssa — tämä meni pieleen kahdesti edellisessä vuorossa),
   bumppaa versio, commit, push, avaa PR jonka kuvauksessa mainitaan
   nimeltä ne 5 poikkeusta jotka jäävät kaupunkiin ja miksi.
4. Sen jälkeen astronautin kameran erät 5-6 (ks. luovutuksen kohta 5).

SITOVAT KÄYTÄNNÖT:
- JUMI → FABLE: jumissa yksi viesti Fablelle (tilanne, vaihtoehdot, suositus), ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10 viestiä/vuoro; varakanava mcp send_message session id:llä.
- ÄLÄ vaihda gitin haaraa samassa työhakemistossa kun taustalla on
  käynnissä pitkä `node --test tests/*.test.mjs` -ajo — tiedostot
  muuttuvat kesken ajon ja yksi testi ("sama lähde antaa tavulleen
  saman viennin") menee sekaisin. Odota ajon valmistumista ennen
  haaranvaihtoa, tai aja se vain haarassa jota et aio vaihtaa.
- Agentit vain Sonnet/Opus, enintään 3-4 rinnan.
- Kuvat vain PD/CC0/CC BY/CC BY-SA Commonsista tai NASA (public
  domain astronautin kamera -linssille), tarkistettuina API:sta
  suoraan; NASA-kuvat lisäksi katsottava käsin ennen hyväksymistä.
- Maakuntien kuvien lataus+vienti tehdään AINA pääsessiossa itse
  (ei agenteille AWS-tunnuksia); `source ~/.zshrc` lataa tarvittavat
  R2-muuttujat.
