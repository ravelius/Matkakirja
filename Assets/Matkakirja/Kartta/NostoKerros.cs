using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using CesiumForUnity;
using Matkakirja.Peli;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// NOSTOKERROS (webin pallon nostot, js/pallolauta/nostot.js + js/fokuskohteet.js): nykyisen maan
    /// nostot kartalla. Tämä on kartan puoli: mitkä nostot näkyvät ja missä kohtaa ruutua. Natiivi-UI
    /// piirtää merkit (NostoMerkit-symbolit, nimiöt, ryhmät) ja avaa kortin napautuksesta.
    ///
    /// Webin säännöt:
    ///  - Nostot ovat nykyisen maan (pelaajan kaupungin maa; <see cref="Maa"/> voittaa) ja vain
    ///    pääkartan nostot (karttavalot.json paakartalla).
    ///  - Portit (löydös 50 osa B, <see cref="NostoSaannot"/>): KATTO EI KOSKE KOHDEMAATA, joten `lahizoom`-lippu
    ///    ei piilota mitään (web näyttää lähi-nostot heti); vain taso 3 odottaa lähizoomia (<see cref="UloinOsuus"/>
    ///    ≤ 0,7). Kaupungin sisäiset (paikka = kaupunki tai oma paikka ≤ 12 km kaupungista) ja nimikerroksen meret
    ///    eivät ole kartalla millään zoomilla. Diagnoosi: komento `nostot tila` (<see cref="Kuvaus"/>).
    ///  - Kerros näkyy, kun maan leveys on vähintään <see cref="vahinOsuus"/> näkyvästä leveydestä
    ///    (LEHDEN_VAHIN_OSUUS 0,5: osuus, ei zoomitaso) ja saapumisesta on kulunut 1,4 s kameran
    ///    ja nappulan pysähdyttyä (saapumisPortti, PORTIN_VIIVE_MS). Syttyminen 0,7 s.
    ///  - Enintään <see cref="katto"/> nostoa kerrallaan, lähimmät ruudun keskeltä (NOSTOJEN_KATTO 120).
    /// Aineisto: kokoelmat/karttavalot.json (sama joukko kuin webin pallon nostokerros, skeema 1.24)
    /// ja maarajat.json:n bbox (maan leveys).
    /// </summary>
    public class NostoKerros : MonoBehaviour
    {
        public static NostoKerros Instanssi { get; private set; }

        public PalloKierto kierto;
        public KaupunkiMerkit merkit;
        public Nappula nappula;
        [Tooltip("LEHDEN_VAHIN_OSUUS: maan leveys / näkyvä leveys, jonka alla kerros on piilossa.")]
        public float vahinOsuus = 0.5f;
        [Tooltip("NOSTOJEN_KATTO: enintään näin monta nostoa kerrallaan.")]
        public int katto = 120;
        [Tooltip("PORTIN_VIIVE_MS: viive saapumisesta (kamera ja nappula paikallaan), sekunteina.")]
        public float porttiViive = 1.4f;
        [Tooltip("KOHTEIDEN_SYTTYMINEN_MS: syttymisen kesto sekunteina (Natiivi-UI lukee Syttyminen).")]
        public float syttyminenS = 0.7f;
        [Tooltip("LAHIZOOMIN_OSUUS_ULOIMMASTA: lähizoomi auki (taso 3 näkyy), kun korkeus / saapumisnäkymän korkeus on enintään tämä.")]
        public double lahizoomOsuus = NostoSaannot.LahizoominOsuus;

        public sealed class Nosto
        {
            public string Id, Tunnus, Aihe, Kategoria, Nimi, Nimio, Maa, KaupunkiAvain, TakyNosto;
            /// <summary>Piirtopiste: viennin `ladottu`, puuttuessa oma paikka.</summary>
            public double Lat, Lon;
            /// <summary>Noston OMA paikka (karttavalot lat/lon, kohdekartan piste tai laudan datapiste; web omaLat/omaLng).</summary>
            public double OmaLat, OmaLon;
            /// <summary>Paikkanimi datasta (karttavalot `paikka`, esim. "Pariisi"; web paikkaNimi).</summary>
            public string Paikka;
            public int Taso, Tarkeys;
            /// <summary>Datan `lahizoom`-lippu. Ei portti kohdemaassa (web KATTO EI KOSKE KOHDEMAATA); tieto säilyy.</summary>
            public bool Lahizoom;
            /// <summary>Datan portti (kaupungin sisäinen tai meri; Nakyy = ei datan estettä). Lasketaan kerran.</summary>
            public NostoSaannot.Syy DatanSyy;
            /// <summary>Kaupunki, jonka sisäinen nosto on (diagnoosi), tai null.</summary>
            public string SisaKaupunki;
            /// <summary>Paikka ruudulla pikseleinä (origo vasen alakulma, kuten Input), päivitetään kehyksittäin.</summary>
            public Vector2 Ruutu;
            /// <summary>Etäisyys ruudun keskeltä pikseleinä (järjestys).</summary>
            public float Keskelta;
        }

        /// <summary>Pakotettu maa (ISO3) tai null = pelaajan kaupungin maa (nappulan lähin kaupunki).</summary>
        public string Maa { get; set; }
        /// <summary>Maa, jonka nostoja nyt näytetään (ISO3) tai null.</summary>
        public string NykyinenMaa { get; private set; }
        /// <summary>Kerros käytettävissä (osuus ja saapumisportti täyttyvät).</summary>
        public bool Nakyvissa { get; private set; }
        /// <summary>0→1 syttymisen aikana (Natiivi-UI:n peittävyys), 1 kun syttynyt.</summary>
        public float Syttyminen { get; private set; }
        /// <summary>Nykyisen maan leveys / näkyvä leveys (web osuus).</summary>
        public float Osuus { get; private set; }
        /// <summary>Lähizoomi auki (<see cref="UloinOsuus"/> ≤ <see cref="lahizoomOsuus"/>, web lahizoomiAuki): sama portti
        /// päästää taso 3:n nostot ja ryhmämerkkien nimiöt (web aihenostonNimioNakyy). Linssinimissä aina auki.</summary>
        public bool Lahella { get; private set; }
        /// <summary>
        /// Näkymän osuus uloimmasta sallitusta (web lauta.js uloimmanOsuus): kameran korkeus / maan saapumisnäkymän
        /// korkeus. Saapuessa 1, yksi porras sisään 0,5. 0 = raja tuntematon (rajat lataamatta tai maa saapuu
        /// kaupunkinäkymään, web uloszoomausRaja null), jolloin lähizoomi on kiinni.
        /// </summary>
        public double UloinOsuus { get; private set; }
        /// <summary>
        /// KARTAN MITTAKERROIN nostojen koolle (web nostot.js:633 nostonKarttakerroin = nimet.js:303 nimenKarttakerroin):
        /// saapumisnäkymän korkeus / nykyinen korkeus (näkyvä leveys on korkeuteen verrannollinen), rajattu
        /// [0,2; 64] ja porrastettu suhteellisin 0,5 %:n askelin (NIMEN_KERTOIMEN_PORRAS 1,005). Saapuessa 1, lähizoomissa
        /// 2–4. Saapumiskorkeus lasketaan samalla funktiolla kuin saapumisajo (PalloKierto.SaapumisNakyma, pelaajan
        /// kaupungin paikasta, välimuistissa maan ja ruudun mukaan), joten se on sama kuin viimeisimmän saapumisajon
        /// korkeus eikä riipu siitä, onko ajoa tässä istunnossa tehty. Kaupunkinäkymän maissa (RUS, USA …) vertailu
        /// on kaupunkinäkymän korkeus. Rajojen latautumatta 1. Päivittyy kehyksittäin (Paivittyi herää muutoksesta).
        /// </summary>
        public float ZoomKerroin { get; private set; } = 1f;
        /// <summary>Tämän kehyksen näytettävät nostot (ruudulla, edessä, lähimmät keskeltä, enintään katto).</summary>
        public IReadOnlyList<Nosto> Naytettavat => naytettavat;
        /// <summary>Herää, kun Naytettavat, Nakyvissa tai Syttyminen muuttui tässä kehyksessä.</summary>
        public event Action Paivittyi;
        public bool Valmis { get; private set; }

        /// <summary>
        /// LINSSINIMET (KarttaKerrokset.Nakyvyys("linssinimet"), RAJAPINTA luku 3c ja 4): linssin aikana nostot ja
        /// niiden nimet näkyvät kuten webissä, jossa nostotaso on poltettu maittain laattoihin (pelin repo
        /// js/pallolaatat.js:433–441 nostotMaittain, tools/generoi-laattapyramidi.mjs:430 NOSTOTASO) ja jää kartalle,
        /// kun elävät merkit piilotetaan (css/styles.css:11946 body.aikajana-paalla). Tila ohittaa saapumisportin
        /// (linssin kamera liikkuu) ja avaa <see cref="Lahella"/>-portin, jotta ryhmämerkkienkin nimet näkyvät ilman
        /// viuhkaa. Maa ja osuusportti pysyvät (web: kohdemaan laatasto tasoilta z5 alkaen). Natiivi-UI näyttää
        /// merkit linssin aikana tämän mukaan, ilman napautusta. KarttaKerrokset asettaa tämän.
        /// </summary>
        public bool LinssiNimet
        {
            get => linssiNimet;
            set
            {
                if (linssiNimet == value) return;
                linssiNimet = value;
                muuttui = nakymaMuuttui = true;
            }
        }
        bool linssiNimet;

        readonly Dictionary<string, List<Nosto>> maittain = new Dictionary<string, List<Nosto>>();
        readonly Dictionary<string, double4> bboxit = new Dictionary<string, double4>(); // länsi, etelä, itä, pohjoinen
        readonly List<Nosto> naytettavat = new List<Nosto>();
        /// <summary>Nimikerroksen merinimet (aluenimet luokka meri/valtameri + merinimet), datan porttia varten.</summary>
        readonly HashSet<string> merinimet = new HashSet<string>();
        int luokiteltuKaupunkeja = -1;
        // Saapumisnäkymän korkeus (m) välimuistissa: avain = maa, ruutu, FOV, rajojen tila ja pelaajan paikka 0,1°.
        string saapumisAvain;
        double saapumisKorkeusM, uloinKorkeusM;
        float pysahtyi = -1f, sytytysAlku = -1f;
        string edellinenMaa;
        bool muuttui;

        bool nakymaMuuttui;

        void Awake() => Instanssi = this;
        void OnDestroy()
        {
            if (Instanssi == this) Instanssi = null;
            if (kierto != null) kierto.NakymaMuuttui -= Muuttui;
        }
        void Start()
        {
            if (kierto != null) kierto.NakymaMuuttui += Muuttui;
            StartCoroutine(Lataa());
        }
        void Muuttui() => nakymaMuuttui = true;

        IEnumerator Lataa()
        {
            string valot = null, rajat = null, maatJson = null, aluenimet = null, merinimetJson = null;
            yield return Sisalto.HaeTeksti("karttavalot", t => valot = t, true);
            yield return Sisalto.HaeTeksti("maarajat", t => rajat = t, true);
            yield return Sisalto.HaeTeksti("maat", t => maatJson = t, true);
            yield return Sisalto.HaeTeksti("aluenimet", t => aluenimet = t, true);
            yield return Sisalto.HaeTeksti("merinimet", t => merinimetJson = t, true);
            if (valot == null) { Debug.LogWarning("MATKAKIRJA nostot: karttavalot.json puuttuu"); yield break; }
            var tehtava = Task.Run(() =>
            {
                Jasenna(valot, rajat);
                JasennaFokuspohjat(maatJson);
                if (aluenimet != null) NostoSaannot.LisaaMerinimet(MiniJson.Alkiot(aluenimet), true, merinimet);
                if (merinimetJson != null) NostoSaannot.LisaaMerinimet(MiniJson.Alkiot(merinimetJson), false, merinimet);
            });
            while (!tehtava.IsCompleted) yield return null;
            if (tehtava.IsFaulted) { Debug.LogError("MATKAKIRJA nostot: " + tehtava.Exception?.GetBaseException()); yield break; }
            int n = 0;
            foreach (var l in maittain.Values) n += l.Count;
            Valmis = true;
            Debug.Log($"MATKAKIRJA nostot: {n} pääkartan nostoa {maittain.Count} maassa, {bboxit.Count} maan rajat, {merinimet.Count} merinimeä");
        }

        void Jasenna(string valot, string rajat)
        {
            if (MiniJson.Jasenna(valot) is Dictionary<string, object> juuri && juuri.GetValueOrDefault("alkiot") is List<object> alkiot)
            {
                foreach (var o in alkiot)
                {
                    if (!(o is Dictionary<string, object> a)) continue;
                    if (a.GetValueOrDefault("paakartalla") is bool pk && !pk) continue;
                    var ladottu = MiniJson.Kentta(a, "ladottu") as Dictionary<string, object>;
                    double? omaLat = MiniJson.Luku(a, "lat"), omaLon = MiniJson.Luku(a, "lon");
                    var s = new Nosto
                    {
                        Id = MiniJson.Teksti(a, "id"),
                        Tunnus = MiniJson.Teksti(a, "tunnus"),
                        Aihe = MiniJson.Teksti(a, "aihe"),
                        Kategoria = MiniJson.Teksti(a, "kategoria"),
                        Nimi = MiniJson.Teksti(a, "nimi"),
                        Nimio = MiniJson.Teksti(a, "nimio"),
                        Maa = MiniJson.Teksti(a, "maa"),
                        KaupunkiAvain = MiniJson.Teksti(a, "kaupunkiAvain"),
                        TakyNosto = MiniJson.Teksti(a, "takynosto"),
                        Lat = (ladottu != null ? MiniJson.Luku(ladottu, "lat") : null) ?? omaLat ?? 0,
                        Lon = (ladottu != null ? MiniJson.Luku(ladottu, "lon") : null) ?? omaLon ?? 0,
                        OmaLat = omaLat ?? double.NaN,
                        OmaLon = omaLon ?? double.NaN,
                        // Skeema: paikka on merkkijono; vanhassa muodossa olio { nimi } (web kohde.paikka?.nimi).
                        Paikka = MiniJson.Kentta(a, "paikka") is Dictionary<string, object> po ? MiniJson.Teksti(po, "nimi") : MiniJson.Teksti(a, "paikka"),
                        Taso = (int)(MiniJson.Luku(a, "taso") ?? 1),
                        Tarkeys = (int)(MiniJson.Luku(a, "tarkeys") ?? 1),
                        Lahizoom = a.GetValueOrDefault("lahizoom") is bool lz && lz,
                    };
                    if (s.Id == null || s.Maa == null) continue;
                    if (double.IsNaN(s.OmaLat) || double.IsNaN(s.OmaLon)) { s.OmaLat = s.Lat; s.OmaLon = s.Lon; }
                    if (!maittain.TryGetValue(s.Maa, out var l)) maittain[s.Maa] = l = new List<Nosto>();
                    l.Add(s);
                }
            }
            if (rajat != null && MiniJson.Jasenna(rajat) is Dictionary<string, object> r && r.GetValueOrDefault("alkiot") is List<object> maat)
            {
                foreach (var o in maat)
                {
                    if (!(o is Dictionary<string, object> m) || !(MiniJson.Kentta(m, "bbox") is List<object> b) || b.Count < 4) continue;
                    string id = MiniJson.Teksti(m, "id");
                    if (id != null)
                        bboxit[id] = new double4(Convert.ToDouble(b[0]), Convert.ToDouble(b[1]), Convert.ToDouble(b[2]), Convert.ToDouble(b[3]));
                }
            }
        }

        /// <summary>
        /// WEB ON MALLI: webin nostotaso lasketaan maan fokuspohjasta (js/pallolauta/nostot.js:707, FOKUS_POHJAT[ISO3]),
        /// ei maarajoista, joiden bbox sisältää merentakaiset alueet (skeema 1.34: FRA −62°). Siirtoseppä nosti pohjan
        /// päätasolle skeemassa 1.35: maat.json alkio.fokuspohja.bbox = [w, s, e, n] asteina. Voittaa maarajat.
        /// </summary>
        void JasennaFokuspohjat(string maatJson)
        {
            if (maatJson == null || !(MiniJson.Jasenna(maatJson) is Dictionary<string, object> r) || !(r.GetValueOrDefault("alkiot") is List<object> maat)) return;
            foreach (var o in maat)
            {
                if (!(o is Dictionary<string, object> m) || !(MiniJson.Kentta(m, "fokuspohja") is Dictionary<string, object> f)
                    || !(MiniJson.Kentta(f, "bbox") is List<object> b) || b.Count < 4) continue;
                string id = MiniJson.Teksti(m, "id");
                if (id != null)
                    bboxit[id] = new double4(Convert.ToDouble(b[0]), Convert.ToDouble(b[1]), Convert.ToDouble(b[2]), Convert.ToDouble(b[3]));
            }
        }

        string PelaajanMaa()
        {
            if (!string.IsNullOrEmpty(Maa)) return Maa;
            if (nappula == null || merkit == null) return null;
            string id = merkit.LahinId(nappula.Lat, nappula.Lon, 0.3);
            return id != null ? merkit.KaupunginMaa(id) : null;
        }

        /// <summary>
        /// Datan portit kaikille nostoille (kaupungin sisäinen, meri): kerran, kun kaupungit ovat latautuneet, ja
        /// uudelleen, jos kaupunkien määrä muuttuu. Keskukset = laudan kaupungit (kaupungit.json, kaikki maat kuten
        /// webin laudanKaupungit) + maan omat kaupunkinostot (aihe kaupungit, oma paikka). Kaupungit latautuvat kerran,
        /// joten luokittelun jälkeen tämä ei enää käy niitä läpi (ei kehyksittäistä varausta).
        /// </summary>
        void Luokittele()
        {
            if (luokiteltuKaupunkeja > 0) return;
            var kaupungit = new List<NostoSaannot.Keskus>();
            if (merkit != null)
                foreach (var k in merkit.Kaupungit())
                    if (k != null) kaupungit.Add(new NostoSaannot.Keskus(k.nimi, k.lat, k.lon));
            if (kaupungit.Count == luokiteltuKaupunkeja) return;
            luokiteltuKaupunkeja = kaupungit.Count;
            var keskukset = new List<NostoSaannot.Keskus>();
            foreach (var lista in maittain.Values)
            {
                keskukset.Clear();
                keskukset.AddRange(kaupungit);
                foreach (var s in lista)
                    if (s.Kategoria == "kaupunki" || s.Aihe == "kaupungit") keskukset.Add(new NostoSaannot.Keskus(s.Nimi, s.OmaLat, s.OmaLon));
                foreach (var s in lista)
                {
                    s.DatanSyy = NostoSaannot.DatanSyy(s.Aihe, s.Kategoria, s.Tunnus, s.Nimi, s.Paikka, s.OmaLat, s.OmaLon,
                        keskukset, merinimet, out var kaupunki);
                    s.SisaKaupunki = kaupunki;
                }
            }
            muuttui = true;
        }

        /// <summary>
        /// Saapumisnäkymän korkeus (m) tälle maalle ja ruudulle (PalloKierto.SaapumisNakyma, sama kuin saapumisajo) ja
        /// uloin sallittu korkeus (web uloszoomausRaja: sama korkeus, tai 0 kun maa saapuu kaupunkinäkymään tai
        /// katto jää lattian alle). Välimuistissa; laskenta vain maan, ruudun, rajojen tai pelaajan paikan muuttuessa.
        /// </summary>
        void PaivitaSaapumisKorkeus(string maa)
        {
            var kamera = kierto.GetComponent<Camera>();
            double lat = nappula != null ? nappula.Lat : kierto.leveys, lon = nappula != null ? nappula.Lon : kierto.pituus;
            string avain = maa == null ? null : string.Concat(maa, "|", kamera != null ? kamera.pixelWidth : Screen.width, "x",
                kamera != null ? kamera.pixelHeight : Screen.height, "|", kamera != null ? kamera.fieldOfView : 0f, "|",
                Saapumisrajaus.Valmis ? "r" : "-", "|", math.round(lat * 10.0), ",", math.round(lon * 10.0));
            if (avain == saapumisAvain) return;
            saapumisAvain = avain;
            saapumisKorkeusM = uloinKorkeusM = 0;
            if (maa == null || !Saapumisrajaus.Valmis) return;
            var t = kierto.SaapumisNakyma(maa, lat, lon);
            double r = CesiumWgs84Ellipsoid.GetMaximumRadius();
            saapumisKorkeusM = t.Korkeus * r;
            uloinKorkeusM = t.Tapa != Saapumisnakyma.Tapa.Kaupunkinakyma && t.Korkeus > t.KorkeusMin ? saapumisKorkeusM : 0;
        }

        void LateUpdate()
        {
            if (!Valmis || kierto == null) return;
            Luokittele();
            string maa = PelaajanMaa();
            if (maa != edellinenMaa)
            {
                edellinenMaa = maa;
                NykyinenMaa = maa;
                pysahtyi = -1f;
                sytytysAlku = -1f;
                muuttui = true;
            }

            // Osuus (web lehdenOsuus): max(pohjan leveys / näkyvä leveys, pohjan korkeus / näkyvä korkeus), asteina.
            double nakyvaLeveys = NakyvaLeveysAsteina(), nakyvaKorkeus = NakyvaKorkeusAsteina();
            Osuus = 0;
            if (maa != null)
            {
                double4 bb;
                if (!bboxit.TryGetValue(maa, out bb) && maittain.TryGetValue(maa, out var lista)) bb = PisteidenBbox(lista);
                double leveys = math.abs(bb.z - bb.x) * math.cos(math.radians((bb.y + bb.w) * 0.5));
                double korkeus = math.abs(bb.w - bb.y);
                Osuus = (float)math.max(nakyvaLeveys > 0 ? leveys / nakyvaLeveys : 0, nakyvaKorkeus > 0 ? korkeus / nakyvaKorkeus : 0);
            }

            // Lähizoomin mitta ja kartan mittakerroin (web uloimmanOsuus ja nostonKarttakerroin).
            PaivitaSaapumisKorkeus(maa);
            UloinOsuus = uloinKorkeusM > 0 && kierto.korkeus > 0 ? kierto.korkeus / uloinKorkeusM : 0;
            float kerroin = (float)NostoSaannot.Karttakerroin(saapumisKorkeusM, kierto.korkeus);
            if (kerroin != ZoomKerroin) { ZoomKerroin = kerroin; muuttui = true; }

            // Saapumisportti: kamera ja nappula paikallaan porttiViiveen ajan (web saapumisPortti).
            bool liikkuu = kierto.Liikkeessa || (nappula != null && nappula.Vaihe != LennonVaihe.Ei) || (nappula != null && nappula.Liikkeessa);
            if (liikkuu) { if (!Nakyvissa) pysahtyi = -1f; }
            else if (pysahtyi < 0) pysahtyi = Time.unscaledTime;
            bool porttiAuki = linssiNimet || Nakyvissa || (pysahtyi >= 0 && Time.unscaledTime - pysahtyi >= porttiViive);

            // Aloitusportissa (PalloKierto.PorttiSumea) ei nostoja: UI piirtäisi ne terävinä sumean pallon päälle.
            bool nakyvissa = maa != null && Osuus >= vahinOsuus && porttiAuki && !PalloKierto.PorttiSumea;
            if (nakyvissa != Nakyvissa)
            {
                Nakyvissa = nakyvissa;
                sytytysAlku = nakyvissa ? Time.unscaledTime : -1f;
                int n = maa != null && maittain.TryGetValue(maa, out var kaikki) ? kaikki.Count : 0;
                Debug.Log($"MATKAKIRJA nostot: {(nakyvissa ? "näkyvissä" : "piilossa")} {maa}, osuus {Osuus:F2}, maan nostoja {n}");
                muuttui = true;
            }
            float sytty = Nakyvissa ? Mathf.Clamp01(sytytysAlku < 0 ? 1f : (Time.unscaledTime - sytytysAlku) / Mathf.Max(0.01f, syttyminenS)) : 0f;
            if (sytty != Syttyminen) { Syttyminen = sytty; muuttui = true; }

            if (Nakyvissa && maittain.TryGetValue(maa, out var nostot))
            {
                if (nakymaMuuttui || muuttui || naytettavat.Count == 0) Paivita(nostot);
            }
            else if (naytettavat.Count > 0) { naytettavat.Clear(); muuttui = true; }

            nakymaMuuttui = false;
            if (muuttui) { muuttui = false; Paivittyi?.Invoke(); }
        }

        bool LahiAuki => UloinOsuus > 0 && UloinOsuus <= lahizoomOsuus;

        void Paivita(List<Nosto> nostot)
        {
            naytettavat.Clear();
            var keski = new Vector2(Screen.width * 0.5f, Screen.height * 0.5f);
            bool lahi = LahiAuki;
            // Linssinimissä ryhmänkin nimi näkyy (web: poltettu nimiö ei ryhmity); taso 3 yhä vain lähellä.
            Lahella = lahi || linssiNimet;
            foreach (var s in nostot)
            {
                // Kohdemaassa lahizoom-lippu ei piilota (web KATTO EI KOSKE KOHDEMAATA); kaupungin sisäiset ja
                // nimikerroksen meret eivät ole kartalla, taso 3 odottaa lähizoomia (NostoSaannot.Portti).
                if (NostoSaannot.Portti(s.DatanSyy, s.Taso, lahi) != NostoSaannot.Syy.Nakyy) continue;
                if (!kierto.RuutuPiste(s.Lat, s.Lon, out var r)) continue;
                s.Ruutu = r;
                s.Keskelta = Vector2.Distance(r, keski);
                naytettavat.Add(s);
            }
            if (naytettavat.Count > katto)
            {
                naytettavat.Sort((a, b) => a.Keskelta.CompareTo(b.Keskelta));
                naytettavat.RemoveRange(katto, naytettavat.Count - katto);
            }
            muuttui = true;
        }

        /// <summary>
        /// DIAGNOOSI (komento `nostot tila [ISO3]`): maan nostot porteittain — näkyvät (ruudulla ja katon alla),
        /// ruudun ulkopuolella, katon yli, kaupungin sisäiset (nimi / 12 km), meret ja lähizoomia odottavat (taso 3),
        /// sekä osuus, uloin osuus, lähizoomi ja mittakerroin. Piilotetuista nimet syineen.
        /// </summary>
        public string Kuvaus(string maa = null)
        {
            maa = string.IsNullOrEmpty(maa) ? NykyinenMaa : maa.ToUpperInvariant();
            var b = new System.Text.StringBuilder();
            b.Append($"MATKAKIRJA nostot tila: maa {maa ?? "-"} (nykyinen {NykyinenMaa ?? "-"}), näkyvissä {Nakyvissa}, osuus {Osuus:F2}, " +
                     $"uloin osuus {UloinOsuus:F3} (saapumiskorkeus {saapumisKorkeusM / 1000.0:F0} km, uloin {uloinKorkeusM / 1000.0:F0} km), " +
                     $"lähizoomi {(LahiAuki ? "auki" : "kiinni")} (≤ {lahizoomOsuus:F2}), linssinimet {linssiNimet}, ZoomKerroin {ZoomKerroin:F3}, " +
                     $"merinimiä {merinimet.Count}, kaupunkeja {luokiteltuKaupunkeja}");
            if (maa == null || !maittain.TryGetValue(maa, out var lista)) { b.Append("; maalla ei nostoja"); return b.ToString(); }
            bool lahi = LahiAuki;
            var nakyvat = new HashSet<Nosto>(maa == NykyinenMaa ? naytettavat : (IEnumerable<Nosto>)Array.Empty<Nosto>());
            var syyt = new Dictionary<string, List<string>>();
            int portista = 0;
            foreach (var s in lista)
            {
                var syy = NostoSaannot.Portti(s.DatanSyy, s.Taso, lahi);
                string avain;
                if (syy == NostoSaannot.Syy.Nakyy)
                {
                    portista++;
                    if (nakyvat.Contains(s)) continue;
                    avain = maa != NykyinenMaa || !Nakyvissa ? "kerros pois" : kierto.RuutuPiste(s.Lat, s.Lon, out _) ? "katon yli" : "ei ruudulla";
                }
                else if (syy == NostoSaannot.Syy.KaupunginNimi) avain = "kaupunki (paikka " + s.SisaKaupunki + ")";
                else if (syy == NostoSaannot.Syy.KaupunginSade) avain = "kaupunki (≤ 12 km " + s.SisaKaupunki + ")";
                else if (syy == NostoSaannot.Syy.Meri) avain = "meri";
                else avain = "taso 3";
                if (!syyt.TryGetValue(avain, out var nimet)) syyt[avain] = nimet = new List<string>();
                nimet.Add(s.Nimio ?? s.Nimi);
            }
            int lahiLippu = 0;
            foreach (var s in lista) if (s.Lahizoom) lahiLippu++;
            b.Append($"; nostoja {lista.Count} (lahizoom-lippu {lahiLippu}, ei porttia), porttien läpi {portista}, näkyy {nakyvat.Count}");
            foreach (var p in syyt) b.Append($"\n  {p.Key}: {p.Value.Count} — {string.Join(", ", p.Value)}");
            return b.ToString();
        }

        double NakyvaLeveysAsteina()
        {
            var kamera = kierto.GetComponent<Camera>();
            if (kamera == null) return 0;
            double pysty = math.radians(kamera.fieldOfView) * 0.5;
            double vaaka = math.atan(math.tan(pysty) * kamera.aspect);
            // Kaari, joka näkyy vaakasuunnassa korkeudelta (pieni kulma: 2·h·tan / R, rajattu puolipalloon).
            double r = 6371000.0;
            return math.degrees(math.min(math.PI, 2.0 * kierto.korkeus * math.tan(vaaka) / r));
        }

        double NakyvaKorkeusAsteina()
        {
            var kamera = kierto.GetComponent<Camera>();
            if (kamera == null) return 0;
            double pysty = math.radians(kamera.fieldOfView) * 0.5;
            return math.degrees(math.min(math.PI, 2.0 * kierto.korkeus * math.tan(pysty) / 6371000.0));
        }

        static double4 PisteidenBbox(List<Nosto> l)
        {
            var bb = new double4(180, 90, -180, -90);
            foreach (var s in l) bb = new double4(math.min(bb.x, s.Lon), math.min(bb.y, s.Lat), math.max(bb.z, s.Lon), math.max(bb.w, s.Lat));
            return bb;
        }
    }
}
