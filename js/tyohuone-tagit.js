/*
 * Tagit työhuoneen "Euroopan tekstit" -sivulle (Opus 5 rakentaa UI:n).
 * Fable max täyttää tagit sitä mukaa kuin kohteet hiotaan
 * pituusbudjettiin (ateena v565, erä 1 v566, erä 2 tällä haaralla).
 *
 * Tagien tehtävä on näyttää omistajalle kaaren RYTMI yhdellä
 * silmäyksellä — erityisesti peräkkäisten kohteiden samat tunnetilat
 * ja beatit. Siksi tagitetaan rehellisesti, ei tasoitellen: jos
 * kolme naapuria on "arvoitus + tuore jälki", sen kuuluu näkyä.
 *
 * Luokat (uusia saa lisätä tarpeen mukaan):
 *   puhuja     — kenen ääni kantaa: 'Horatio 1873', vartijan nimi,
 *                'Reginald' vain jos hänen mietintönsä erottuu.
 *   tunnetilat — raamatun seitsemästä sävelestä ne, jotka kohteessa
 *                oikeasti soivat (1–2 päällimmäistä).
 *   teemat     — kohtauksen kantavat ainekset (mittaus, kommellus,
 *                legenda, suvun jälki, pieni teko, väärä johtolanka…).
 *   beat       — aarteen loppubeat raamatun paletista.
 *   motiivit   — kaaren motiivilangat, jos kohteessa on sellainen
 *                (tähtäinristi, barometri, H. F., kevätkulkija,
 *                isoisän merkki, "sinä, joka tätä luet", nykymaailma).
 *   aisti      — haju/maku/tunto, jos kohteessa on aistibeat.
 */
export const KAARI_TAGIT = {
  ateena: {
    puhuja: ['Horatio 1873', 'Nikos'],
    tunnetilat: ['arvoitus', 'huumori'],
    teemat: ['mittaus', 'suvun jälki', 'tuijotuskilpa', 'legenda'],
    beat: ['tuore jälki'],
  },
  praha: {
    puhuja: ['Horatio 1873', 'Tomáš', 'Reginald'],
    tunnetilat: ['arvoitus', 'lämpö'],
    teemat: ['kommellus', 'suvun jälki', 'pieni teko'],
    beat: ['toinen esine muualla'],
    motiivit: ['barometri', 'sinä, joka tätä luet'],
  },
  istanbul: {
    puhuja: ['Horatio 1873', 'Emine', 'Reginald'],
    tunnetilat: ['ihmetys', 'jännitys'],
    teemat: ['mittaus', 'suvun jälki', 'maanalainen maailma'],
    beat: ['ajaton arvoitus'],
    motiivit: ['nykymaailma'],
  },
  wien: {
    puhuja: ['Horatio 1873', 'Anton'],
    tunnetilat: ['ihmetys', 'arvoitus'],
    teemat: ['1873-ankkuri', 'kommellus', 'mittaus'],
    beat: ['ajaton arvoitus'],
  },
  venetsia: {
    puhuja: ['Horatio 1873', 'Lucia'],
    tunnetilat: ['arvoitus', 'jännitys'],
    teemat: ['esine', 'suvun jälki'],
    beat: ['tuore jälki'],
    motiivit: ['barometri', 'H. F.', 'kevätkulkija'],
  },
  budapest: {
    puhuja: ['Horatio 1873', 'Márta'],
    tunnetilat: ['ihmetys', 'jännitys'],
    teemat: ['1873-ankkuri', 'opetettu taito', 'mittaus'],
    beat: ['tuore jälki'],
    motiivit: ['tähtäinristi'],
  },
  lontoo: {
    puhuja: ['Horatio 1873', 'Ned'],
    tunnetilat: ['jännitys', 'haikeus'],
    teemat: ['kommellus', 'esine', 'joki antaa takaisin'],
    beat: ['tuore jälki'],
    motiivit: ['H. F.', 'sinä, joka tätä luet'],
  },
  pariisi: {
    puhuja: ['Horatio 1873', 'Colette'],
    tunnetilat: ['huumori', 'arvoitus'],
    teemat: ['kommellus', 'suvun jälki', 'kirja'],
    beat: ['ajaton arvoitus'],
    motiivit: ['tähtäinristi'],
  },
  rooma: {
    puhuja: ['Horatio 1873', 'Enzo', 'Reginald'],
    tunnetilat: ['huumori', 'arvoitus'],
    teemat: ['kommellus', 'legenda', 'pieni teko'],
    beat: ['tuore jälki'],
    motiivit: ['tähtäinristi', 'nykymaailma'],
  },
  sofia: {
    puhuja: ['Horatio 1873', 'Nadia'],
    tunnetilat: ['arvoitus', 'lämpö'],
    teemat: ['mittaus', 'toinen mittaaja', 'pieni teko'],
    beat: ['tuore jälki'],
  },
  pietari: {
    puhuja: ['Horatio 1873', 'Dmitri'],
    tunnetilat: ['ihmetys', 'haikeus'],
    teemat: ['kommellus', 'mittaus', 'Horation pieni pyyntö'],
    beat: ['tuore jälki'],
  },
  varsova: {
    puhuja: ['Horatio 1873', 'Jadwiga'],
    tunnetilat: ['jännitys', 'arvoitus'],
    teemat: ['legenda', 'taikausko', 'joki ottaa takaisin'],
    beat: ['tuore jälki'],
  },
  vilna: {
    puhuja: ['Horatio 1873', 'Rasa'],
    tunnetilat: ['lämpö', 'arvoitus'],
    teemat: ['taikausko', 'suvun tapa', 'mahdoton lämpö'],
    beat: ['tuore jälki'],
  },
  marseille: {
    puhuja: ['Horatio 1873', 'Baptiste'],
    tunnetilat: ['jännitys', 'huumori'],
    teemat: ['kommellus', 'kirjallisuus', 'lupaus'],
    beat: ['toinen esine muualla'],
  },
  islanti: {
    puhuja: ['Horatio 1873', 'Björk'],
    tunnetilat: ['ihmetys', 'arvoitus'],
    teemat: ['mittaus', 'kommellus', 'vaiennut opas'],
    beat: ['tuore jälki'],
    motiivit: ['kevätkulkija'],
  },
  amsterdam: {
    puhuja: ['Horatio 1873', 'Willem'],
    tunnetilat: ['huumori', 'arvoitus'],
    teemat: ['mittaus', 'mahdoton tapahtuma', 'viesti'],
    beat: ['tuore jälki'],
    motiivit: ['kevätkulkija'],
  },
  granada: {
    puhuja: ['Horatio 1873', 'Yusuf'],
    tunnetilat: ['hengähdys', 'ihmetys'],
    teemat: ['mittaus', 'opetettu taito', 'veden ääni'],
    beat: ['tuore jälki'],
    aisti: ['maku'],
  },
  sisilia: {
    puhuja: ['Horatio 1873', 'Rosalia'],
    tunnetilat: ['huumori', 'arvoitus'],
    teemat: ['väärä johtolanka', 'mittaus', 'legenda'],
    beat: ['tuore jälki'],
  },
  sarajevo: {
    puhuja: ['Horatio 1873', 'Emir'],
    tunnetilat: ['lämpö', 'huumori'],
    teemat: ['kommellus', 'legenda', 'vieraanvaraisuus'],
    beat: ['tuore jälki'],
    motiivit: ['H. F.'],
    aisti: ['maku'],
  },
  kiova: {
    puhuja: ['Horatio 1873', 'Oksana'],
    tunnetilat: ['lämpö', 'arvoitus'],
    teemat: ['kommellus', 'opetettu tapa', 'sormin luettava'],
    beat: ['tuore jälki'],
    motiivit: ['isoisän merkki'],
  },
  bukarest: {
    puhuja: ['Horatio 1873', 'Ana'],
    tunnetilat: ['arvoitus', 'ihmetys'],
    teemat: ['legenda', 'mahdoton esine', 'mittaus'],
    beat: ['tuore jälki'],
  },
  tallinna: {
    puhuja: ['Horatio 1873', 'Kristjan'],
    tunnetilat: ['lämpö', 'arvoitus'],
    teemat: ['tosihuomio', 'suvun kirjaus', 'vahti'],
    beat: ['tuore jälki'],
    aisti: ['maku'],
  },
  riika: {
    puhuja: ['Horatio 1873', 'Ilze'],
    tunnetilat: ['huumori', 'arvoitus'],
    teemat: ['kommellus', 'mahdoton esine', 'mittaus'],
    beat: ['ajaton arvoitus'],
  },
  kobenhavn: {
    puhuja: ['Horatio 1873', 'Karen'],
    tunnetilat: ['lämpö', 'arvoitus'],
    teemat: ['satu', 'viesti', 'kesken jäänyt työ'],
    beat: ['tuore jälki'],
  },
  tromssa: {
    puhuja: ['Horatio 1873', 'Ingrid'],
    tunnetilat: ['ihmetys', 'lämpö'],
    teemat: ['mittaus', 'suvun oma tapa', 'valvottu lyhty'],
    beat: ['tuore jälki'],
  },
  bagdad: {
    puhuja: ['Horatio 1873', 'Yusuf'],
    tunnetilat: ['arvoitus'],
    teemat: ['1873-ankkuri', 'kirjurit', 'noutajan ehto'],
    beat: ['tuore jälki'],
    motiivit: ['barometri'],
  },
  teheran: {
    puhuja: ['Horatio 1873', 'Reza'],
    tunnetilat: ['ihmetys', 'arvoitus'],
    teemat: ['1873-ankkuri', 'kesken jäänyt tarina', 'mestarien tapa'],
    beat: ['tuore jälki'],
  },
  isfahan: {
    puhuja: ['Horatio 1873', 'Farhad'],
    tunnetilat: ['ihmetys', 'lämpö'],
    teemat: ['laulu ja kaiku', 'salattu sanonta'],
    beat: ['tuore jälki'],
    motiivit: ['isoisän merkki'],
  },
  salalah: {
    puhuja: ['Horatio 1873', 'Mariam'],
    tunnetilat: ['lämpö', 'ihmetys'],
    teemat: ['pieni teko', 'oikaistu vaaka'],
    beat: ['ajaton arvoitus'],
    aisti: ['tuoksu'],
  },
  kuwait: {
    puhuja: ['Horatio 1873', 'Nasser'],
    tunnetilat: ['ihmetys', 'lämpö'],
    teemat: ['pieni teko', 'suvun oma tapa', 'mestarin silmä'],
    beat: ['ajaton arvoitus'],
    aisti: ['maku'],
  },
  nikosia: {
    puhuja: ['Horatio 1873', 'Andreas'],
    tunnetilat: ['arvoitus', 'huumori'],
    teemat: ['mittaus', 'talletus jota ei voi torjua', 'muinainen esine'],
    beat: ['ajaton arvoitus'],
  },
  riad: {
    puhuja: ['Horatio 1873', 'Abdullah'],
    tunnetilat: ['arvoitus', 'ihmetys'],
    teemat: ['mittaus', 'vieras työkalu', 'koe'],
    beat: ['tuore jälki'],
  },
  mekka: {
    puhuja: ['Horatio 1873', 'Bilal'],
    tunnetilat: ['lämpö', 'hengähdys'],
    teemat: ['kunnioitus', 'suunta', 'perintökysymys'],
    beat: ['hiljainen loppu'],
    aisti: ['tuoksu'],
  },
  ankara: {
    puhuja: ['Horatio 1873', 'Elif'],
    tunnetilat: ['arvoitus', 'ihmetys'],
    teemat: ['sinetöity paali', 'noutamisen ehto', 'mahdoton aika'],
    beat: ['ajaton arvoitus'],
    motiivit: ['barometri'],
  },
  siinai: {
    puhuja: ['Horatio 1873', 'Gabriel'],
    tunnetilat: ['hengähdys', 'arvoitus'],
    teemat: ['laina ja palautus', 'kirjasto'],
    beat: ['tuore jälki'],
  },
};
