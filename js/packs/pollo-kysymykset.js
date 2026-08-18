/*
 * PÖLLÖN VALMISKYSYMYKSET (omistajan tilaus 18.8.2026, vaihe 1).
 *
 * Käsin kirjoitetut avauskysymykset pöllön chat-paneelin alareunaan:
 * ne näkyvät VAIN keskustelun alussa, ja ensimmäisen oman kysymyksen
 * jälkeen palataan pöllön dynaamisiin jatkokysymyksiin (js/pollo.js).
 *
 * MUOTO. Avain on kaupunki-id (sama kuin laudan cities-listassa) ja
 * konteksti:
 *
 *   'laatta' — kaupunkilaatta kartalla, pelaaja seisoo kaupungissa
 *   'lehti'  — kaupungin oma lehti on auki
 *
 * Jokaisessa tilanteessa on täsmälleen 5 kysymystä. Säännöt:
 *
 *   - suomeksi, pelaajan äänellä, enintään 70 merkkiä
 *   - aiheet pelin omasta aineistosta (kulttuurinostot, nähtävyysjutut,
 *     maatiedot) tai yleistiedosta, jotta pöllöllä on mistä vastata
 *   - EI visavastauksia paljastavia eikä juonispoilereita (Raamatun
 *     pöllölinjaus: pöllö on tiedon hahmo, ei tarinan)
 *
 * PILOTTIERÄ: Firenze, Tampere, Kairo, Tokio, Pariisi, Helsinki.
 * LOPUT KAUPUNGIT TÄYTETÄÄN SARJATYÖNÄ SAMALLA KAAVALLA: lisää
 * kaupungille oma lohko (laatta + lehti, 5 + 5 kysymystä) — mitään
 * muuta ei tarvitse muuttaa. Kaupunki, jolla ei ole lohkoa, ei näytä
 * pelissä mitään (ei tyhjää laatikkoa).
 *
 * VAIHE 2 (työn alla erikseen): kysymyslista voidaan myöhemmin hakea
 * palvelimelta ja generoida uudelleen. Siksi js/pollo.js kutsuu VAIN
 * alla olevaa haeValmiskysymykset-funktiota — kun toteutus vaihtuu,
 * kutsujaan ei kosketa.
 */

export const POLLO_VALMISKYSYMYKSET = {
  firenze: {
    laatta: [
      'Miksi Ponte Vecchion päällä on taloja?',
      'Mikä teki Medici-suvusta niin mahtavan?',
      'Kuinka kauan Duomon kupolia rakennettiin?',
      'Mikä renessanssi oli, ja miksi se alkoi juuri Firenzestä?',
      'Millainen raha floriini oli?',
    ],
    lehti: [
      'Kuka suunnitteli Duomon kupolin, ja miten se pysyy pystyssä?',
      'Mitä Uffizissa oli ennen taidemuseota?',
      'Miksi Michelangelon David on niin kuuluisa?',
      'Mikä on Vasarin käytävä?',
      'Miksi Ponte Vecchiolla myydään kultaa?',
    ],
  },

  tampere: {
    laatta: [
      'Miksi Tampere syntyi juuri kosken partaalle?',
      'Kuka oli James Finlayson?',
      'Miksi Tamperetta kutsutaan Suomen Manchesteriksi?',
      'Kuinka korkea Näsinneula on?',
      'Mitä Tampereen tehtaissa valmistettiin 1800-luvulla?',
    ],
    lehti: [
      'Missä Suomen ensimmäinen sähkövalo syttyi?',
      'Millaista oli asua Amurin työläiskorttelissa?',
      'Keitä Hämeensillan patsaat esittävät?',
      'Miksi mustamakkaraa syödään puolukkahillon kanssa?',
      'Paljonko Tammerkoski putoaa, ja mihin sen voima käytettiin?',
    ],
  },

  kairo: {
    laatta: [
      'Kuinka vanhoja Gizan pyramidit ovat?',
      'Miksi Niili oli Egyptille niin tärkeä?',
      'Mitä Khan el-Khalilissa myytiin 1300-luvulla?',
      'Miten Kairosta tuli islamilaisen maailman keskus?',
      'Kuka oli Saladin, ja miksi hän rakensi linnoituksen?',
    ],
    lehti: [
      'Mitä Tutankhamonin haudasta löytyi?',
      'Miksi al-Azharia sanotaan maailman vanhimmaksi yliopistoksi?',
      'Kuka oli Umm Kulthum?',
      'Mikä on Bab Zuweila, ja mihin sitä käytettiin?',
      'Miten hieroglyfit opittiin lukemaan?',
    ],
  },

  tokio: {
    laatta: [
      'Miksi Tokiota kutsuttiin ennen Edoksi?',
      'Miten shogunit hallitsivat Japania?',
      'Miksi Japani sulkeutui ulkomaailmalta yli 200 vuodeksi?',
      'Miten Tokio selvisi suurista tulipaloistaan?',
      'Kuinka monta ihmistä Tokion seudulla asuu?',
    ],
    lehti: [
      'Mikä on Sensō-jin temppelin tarina?',
      'Miksi Kaminarimon-portilla riippuu jättilyhty?',
      'Mitä Uenon puistossa voi nähdä?',
      'Miksi japanilaisravintolan ikkunassa on muoviruokaa?',
      'Miten teeseremonia etenee?',
    ],
  },

  pariisi: {
    laatta: [
      'Miksi Eiffel-torni rakennettiin?',
      'Miksi Pariisia sanotaan valojen kaupungiksi?',
      'Mitä Ranskan suuressa vallankumouksessa tapahtui?',
      'Kuka rakennutti Pariisin leveät bulevardit?',
      'Mikä Louvre oli ennen museota?',
    ],
    lehti: [
      'Keiden nimet on kullattu Eiffel-tornin kylkeen?',
      'Kuka oli Édith Piaf?',
      'Miksi Mona Lisa on juuri Louvressa?',
      'Mitä Notre-Damen palossa vuonna 2019 menetettiin?',
      'Kenet on haudattu Panthéoniin?',
    ],
  },

  helsinki: {
    laatta: [
      'Miksi Helsinki siirrettiin nykyiselle paikalleen?',
      'Miksi Suomenlinna rakennettiin?',
      'Milloin Helsingistä tuli Suomen pääkaupunki, ja miksi?',
      'Kuka suunnitteli Helsingin empirekeskustan?',
      'Mitä Silakkamarkkinoilla myydään?',
    ],
    lehti: [
      'Miten Temppeliaukion kirkko louhittiin kallioon?',
      'Miksi Uspenskin katedraali näyttää venäläiseltä?',
      'Keitä rautatieaseman kivimiehet ovat?',
      'Miksi Helsinki kelpasi elokuviin Neuvostoliitoksi?',
      'Miksi Suomenlinnan majakka vilkuttaa H-kirjainta?',
    ],
  },
};

/**
 * Valmiskysymykset yhteen tilanteeseen.
 *
 * TÄMÄ ON AINOA OVI PAKKAAN: js/pollo.js kutsuu vain tätä, joten
 * vaiheessa 2 sisällön voi vaihtaa palvelimelta haettuun (tai
 * uudelleengeneroituun) muuttamatta kutsujaa.
 *
 * @param {string} kaupunkiId laudan kaupunki-id (esim. 'firenze')
 * @param {'laatta'|'lehti'} konteksti missä pelaaja on
 * @returns {string[]} kysymykset, tai tyhjä lista jos niitä ei ole
 */
export function haeValmiskysymykset(kaupunkiId, konteksti) {
  const lista = POLLO_VALMISKYSYMYKSET[kaupunkiId]?.[konteksti];
  return Array.isArray(lista) ? lista : [];
}
