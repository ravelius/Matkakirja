-- SÄHKEJÄRJESTELMÄ — D1-tietokannan rakenne.
--
-- Ajetaan julkaisuajossa (.github/workflows/sahke-worker.yml):
--   wrangler d1 execute matkakirja-sahke --remote --file worker/sahke/skeema.sql
--
-- Jokainen lause on IF NOT EXISTS, joten tiedoston saa ajaa uudelleen
-- joka julkaisussa ilman että mitään katoaa. TÄHÄN TIEDOSTOON EI
-- KIRJOITETA DROP- EIKÄ ALTER-LAUSEITA: kentän lisäys tehdään uutena
-- lauseena omaan tiedostoonsa, jotta vanhan tietokannan päälle ajo ei
-- voi koskaan tyhjentää retkikuntia.
--
-- AIKA on kaikkialla kokonaisluku (Unix-millisekunnit). Näin siivous
-- on yksi vertailu eikä merkkijonojen vertailua, ja rajapinnalle aika
-- muotoillaan ISO-8601:ksi vasta vastauksessa.

-- Retkikunta = liittymiskoodi ja sen elinkaari. 'nahty' on viimeisin
-- hetki, jolloin joku teki retkikunnalle mitään; hiljentynyt retkikunta
-- siivotaan sen perusteella.
CREATE TABLE IF NOT EXISTS retkikunnat (
  koodi TEXT PRIMARY KEY,
  luotu INTEGER NOT NULL,
  nahty INTEGER NOT NULL
);

-- Jäsen. 'avain_tiiviste' on jäsenkohtaisen salaisuuden SHA-256, EI
-- salaisuus itse: tietokannan vuoto ei anna kenellekään oikeutta
-- kirjoittaa toisen nimissä. 'ikkuna' ja 'laskuri' ovat karkean
-- kirjoitusrajoittimen tila.
CREATE TABLE IF NOT EXISTS jasenet (
  koodi TEXT NOT NULL,
  jasen_id TEXT NOT NULL,
  nimimerkki TEXT NOT NULL,
  avain_tiiviste TEXT NOT NULL,
  liittyi INTEGER NOT NULL,
  nahty INTEGER NOT NULL,
  ikkuna INTEGER NOT NULL DEFAULT 0,
  laskuri INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (koodi, jasen_id)
);

-- Sähke on VALKOLISTATTU POHJA + PAIKKA, ei viesti. Taulussa ei ole
-- yhtään vapaan tekstin saraketta, eikä sellaista saa lisätä: se
-- muuttaisi pelin sisäisen merkinannon avoimeksi chatiksi.
CREATE TABLE IF NOT EXISTS sahkeet (
  koodi TEXT NOT NULL,
  id TEXT NOT NULL,
  lahettaja TEXT NOT NULL,
  pohja_id TEXT NOT NULL,
  paikka_id TEXT NOT NULL,
  aika INTEGER NOT NULL,
  PRIMARY KEY (koodi, id)
);

-- Apupyyntö kantaa PELIN OMAA sisältöä: laatan kysymyksen ja sen
-- vaihtoehdot sellaisina kuin peli ne asiakkaalle näytti.
-- 'vaihtoehdot' on JSON-taulukko merkkijonoja.
CREATE TABLE IF NOT EXISTS apupyynnot (
  koodi TEXT NOT NULL,
  apu_id TEXT NOT NULL,
  kysyja TEXT NOT NULL,
  kysymys TEXT NOT NULL,
  vaihtoehdot TEXT NOT NULL,
  aika INTEGER NOT NULL,
  PRIMARY KEY (koodi, apu_id)
);

-- Vastaus on pelkkä indeksi vaihtoehtoihin. Yksi vastaus per jäsen per
-- pyyntö; uusi veikkaus korvaa vanhan.
CREATE TABLE IF NOT EXISTS apuvastaukset (
  koodi TEXT NOT NULL,
  apu_id TEXT NOT NULL,
  vastaaja TEXT NOT NULL,
  veikkaus INTEGER NOT NULL,
  aika INTEGER NOT NULL,
  PRIMARY KEY (koodi, apu_id, vastaaja)
);

-- Tilannekuva haetaan aina yhden retkikunnan koodilla aikajärjestyksessä,
-- ja siivous pyyhkii vanhimman pään. Indeksit on ladottu juuri niin.
CREATE INDEX IF NOT EXISTS sahkeet_aika ON sahkeet (koodi, aika);
CREATE INDEX IF NOT EXISTS apupyynnot_aika ON apupyynnot (koodi, aika);
CREATE INDEX IF NOT EXISTS apuvastaukset_aika ON apuvastaukset (koodi, aika);
CREATE INDEX IF NOT EXISTS sahkeet_siivous ON sahkeet (aika);
CREATE INDEX IF NOT EXISTS apupyynnot_siivous ON apupyynnot (aika);
CREATE INDEX IF NOT EXISTS apuvastaukset_siivous ON apuvastaukset (aika);
CREATE INDEX IF NOT EXISTS retkikunnat_siivous ON retkikunnat (nahty);
