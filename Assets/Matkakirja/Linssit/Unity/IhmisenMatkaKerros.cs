// IHMISEN MATKAN NÄKYMÄ Unityssä (IEsityksenNakyma): vanat pallolla
// (VanaKerros), löytöpaikkojen valot (Valot), tähtitaivas avausjaksossa ja
// Natiivi-UI:n koukut mustalle ruudulle, kertomuksen tekstille, kellolle,
// kuville, pulun välihuomioille ja lopulle.
//
// TUTKIMUSVAIHE (ITutkimuksenNakyma, web ihmisen-matka-tutkimus.js): vanan korostus on tämän
// kerroksen; nostojen pisteet, virtanapit ja lappu ovat Natiivi-UI:n (web DOM-merkit ja palkki).
// UI piirtää pisteet NostonPiste(tunnus)-ruutupisteisiin kuten löytökuvan KuvanPiste.
//
// IHMISEN MATKA II (omistaja 25.9.2026): sama kerros Versio2-lipulla. Esityksen kutsut välitetään lisäksi
// IhmisenMatka2Tehosteet-komponentille (valo, kartan väistö, kuvan alue, myöhemmin sumu ja äänimaisemat), ja
// tekstitys on oletuksena pois (CC-nappi, Natiivi-UI; logiikka TekstiNakyvissa/AsetaTekstitys). I ei muutu.
using System;
using System.Collections.Generic;
using System.Linq;
using CesiumForUnity;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Virrat;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public class IhmisenMatkaKerros : MonoBehaviour, IEsityksenNakyma, ITutkimuksenNakyma
    {
        /// <summary>
        /// Onko UI:ssa esittelylaatikko (Natiivi-UI asettaa). Tosi: esitys ei käynnisty
        /// avatessa, vaan laatikon Käynnistä-nappi kutsuu IhmisenMatkaLinssi.Kaynnista
        /// (web aloitaAjo, joka odottaa myös vanojen laskennan). Vastine KeksinnotKerros.EsittelyUIssa.
        /// </summary>
        public static bool EsittelyUIssa;

        public static Action<bool, double> MustaKasittelija;       // päällä, häivytys ms
        public static Action<double> ValotKasittelija;             // häivytys ms: kehys ja kartta esiin
        public static Action<int, KertomusJakso> JaksoKasittelija; // teksti alas / keskelle avauksessa
        public static Action<double> KelloKasittelija;             // vuosia sitten
        public static Action<string> KuvaKasittelija;              // löytöpaikan tunnus tai null
        public static Action<string> PuluKasittelija;
        public static Action<string, double, string> TunneKasittelija;
        public static Action LoppuKasittelija;

        /// <summary>Tutkimusvaiheen nostot pisteiksi (null = pois). Piste: NostonPiste(tunnus), väri: TutkimusNosto.Vari.</summary>
        public static Action<IReadOnlyList<TutkimusNosto>> NostotKasittelija;
        /// <summary>Virtanapit toimintaan (tosi) tai legendaksi (epätosi); napautus → IhmisenMatkaLinssi.Tutkimus.Valitse.</summary>
        public static Action<bool> NapitKasittelija;
        /// <summary>Valittu virta (null = ei): napin tila ja lappu (Virta.Nimi, Virta.Yhteenveto).</summary>
        public static Action<Matkakirja.Linssit.Virrat.Virta> ValittuKasittelija;

        /// <summary>
        /// Noston ruutupiste (kuten KuvanPiste: Unityn ruutupikselit, origo vasen alakulma); null, kun
        /// piste on pallon takana tai tunnusta ei ole. Luetaan joka kehys.
        /// </summary>
        public static Vector2? NostonPiste(string tunnus) => Instanssi != null ? Instanssi.Ruutupiste(tunnus) : null;

        /// <summary>
        /// Löytöpaikan lamppua napautettiin (web napautaValoa kertomuskaarella → nostokortti.avaa):
        /// Natiivi-UI avaa paikan nostokortin tunnuksella.
        /// </summary>
        public static Action<string> LamppuNapautettu;

        /// <summary>Auki oleva kerros (null, kun ihmisen matka ei ole auki).</summary>
        public static IhmisenMatkaKerros Instanssi { get; private set; }

        /// <summary>Ihmisen matka II (tehosteet, CC, kuvan alue); epätosi = alkuperäinen esitys sellaisenaan.</summary>
        public bool Versio2 { get; private set; }
        /// <summary>II:n tehostekerros (null I:ssä).</summary>
        public IhmisenMatka2Tehosteet Tehosteet { get; private set; }

        // ── TEKSTITYS (Ihmisen matka II, omistaja 25.9.2026: "tekstitys oletuksena pois, yläpalkkiin CC-nappi … aivan
        //    ensimmäinen teksti saa jäädä") ─────────────────────────────────────────────────────────────────────
        /// <summary>Laitteen muisti CC-valinnalle (PlayerPrefs, 0 = pois, oletus pois).</summary>
        public const string TekstitysAvain = "linssi.ihmisen-matka-2.tekstitys";
        static bool? tekstitys;

        /// <summary>Näytetäänkö CC-nappi (vain II:ssa, Natiivi-UI:n yläpalkki).</summary>
        public static bool CcNappi => Instanssi != null && Instanssi.Versio2;

        /// <summary>Tekstitys päällä: I:ssä aina; II:ssa pelaajan valinta (oletus pois).</summary>
        public static bool TekstitysPaalla
        {
            get
            {
                if (Instanssi == null || !Instanssi.Versio2) return true;
                tekstitys ??= PlayerPrefs.GetInt(TekstitysAvain, 0) == 1;
                return tekstitys.Value;
            }
        }

        /// <summary>CC-nappi kytki tekstityksen (tosi = päällä). UI päivittää napin tilan ja tekstin näkyvyyden.</summary>
        public static event Action<bool> TekstitysMuuttui;

        /// <summary>CC-napin napautus (Natiivi-UI): tallentaa valinnan ja ilmoittaa.</summary>
        public static void AsetaTekstitys(bool paalla)
        {
            tekstitys = paalla;
            PlayerPrefs.SetInt(TekstitysAvain, paalla ? 1 : 0);
            PlayerPrefs.Save();
            LinssiOhjain.Instanssi?.Kirjaa("ihmisen matka II: tekstitys " + (paalla ? "päällä" : "pois"));
            TekstitysMuuttui?.Invoke(paalla);
        }

        /// <summary>
        /// Näytetäänkö kertomuksen osa (jakson indeksi, osan tai avauksen lauseen indeksi): I:ssä aina; II:ssa vain
        /// tekstitys päällä, paitsi aivan ensimmäinen virke (jakso 0, osa 0: "Tiedätkö, mistä ihmiset lähtivät liikkeelle?").
        /// Natiivi-UI kutsuu tätä AsetaKertomusteksti-kohdassa.
        /// </summary>
        public static bool TekstiNakyvissa(int jakso, int osa) => TekstitysPaalla || (jakso == 0 && osa == 0);

        // ── HAVAINNEKUVAN ALUE (II: kuvat isommiksi, kartta väistää; omistaja 25.9.2026) ─────────────────────────
        /// <summary>
        /// II:n havainnekuvan paikka ja koko ruudun osuuksina (origo VASEN YLÄKULMA, kuten UI): puhelimella pystyssä
        /// yläpuolisko koko leveydeltä, vaakasuunnassa oikea puolisko. null = I:n tapa (soikio kohdepisteen yllä) tai ei kuvaa.
        /// Natiivi-UI sijoittaa kuvan tähän, kun arvo ei ole null (SijoitaKertomuskuva).
        /// </summary>
        public static Rect? KuvanAlue => Instanssi != null && Instanssi.Tehosteet != null ? Instanssi.Tehosteet.KuvanAlue : null;

        /// <summary>
        /// LÖYTÖKUVAN ANKKURI (web .aikajana-kuva: soikio kohdepisteen yläpuolella, seuraa pistettä
        /// kameran liikkuessa). Nykyisen kuvan kohdepisteen ruutusijainti Unityn ruutupikseleinä
        /// (origo vasen ALAkulma, kuten Input/Camera.WorldToScreenPoint); UI muuntaa paneeliin
        /// RuntimePanelUtils.ScreenToPanel(panel, new Vector2(p.x, Screen.height - p.y)). null, kun
        /// kuvaa ei ole tai piste on pallon takana. Luetaan joka kehys (LateUpdate jälkeen).
        /// </summary>
        public static Vector2? KuvanPiste => Instanssi != null ? Instanssi.Ruutupiste(Instanssi.kuvaKohde) : null;

        readonly Dictionary<string, (double Lat, double Lon)> paikkaIndeksi = new Dictionary<string, (double, double)>(StringComparer.Ordinal);
        string kuvaKohde;

        PalloKierto kierto;
        Matkakirja.Natiivi.Valot valot;
        VanaKerros vanat;
        Tahtitaivas taivas;
        double vuosia = 300000;
        bool pito, valoissa;
        float tahtienPeitto = 1f, valotAlkoi = -1f;

        public static IhmisenMatkaKerros Luo(PalloKierto kierto, IReadOnlyList<Loytopaikka> paikat, bool versio2 = false)
        {
            var g = kierto.georeferenssi;
            var go = new GameObject(versio2 ? "IhmisenMatka2Kerros" : "IhmisenMatkaKerros");
            go.transform.SetParent(g.transform, false);
            var k = go.AddComponent<IhmisenMatkaKerros>();
            k.kierto = kierto;
            k.Versio2 = versio2;
            foreach (var p in paikat) if (p.Tunnus != null) k.paikkaIndeksi[p.Tunnus] = (p.Lat, p.Lon);
            Instanssi = k;
            bool vahennetty = LinssiOhjain.Instanssi?.VahennettyLiike ?? false;
            k.valot = Matkakirja.Natiivi.Valot.Luo(g, paikat.Select(p => (p.Tunnus, p.Lat, p.Lon)).ToList(), vahennetty, kierto.GetComponent<Camera>());
            // Kerroin 60 (web TAHTIEN_KERROIN): avauksen kamera on 300 pallonsäteen päässä, joten tähtien on oltava sitä kauempana.
            k.taivas = Tahtitaivas.Luo(g, Esitysmatikka.TahtienKerroin, vahennetty);
            kierto.Napautettu += k.Napautettu;
            if (versio2)
            {
                k.Tehosteet = go.AddComponent<IhmisenMatka2Tehosteet>();
                k.Tehosteet.Kytke(k, kierto, k.paikkaIndeksi);
            }
            return k;
        }

        /// <summary>Paikan koordinaatit tunnuksella (löytöpaikka tai tutkimusvaiheen nosto); null, jos ei tunneta.</summary>
        public (double Lat, double Lon)? Paikka(string tunnus) =>
            tunnus != null && paikkaIndeksi.TryGetValue(tunnus, out var p) ? p : ((double, double)?)null;

        /// <summary>Vanakerros (II: kuvan alueen häivytys varjostimelle); null ennen vanojen laskentaa.</summary>
        public VanaKerros Vanat => vanat;

        void Napautettu(Vector2 ruutu)
        {
            var t = valot?.Osuma(ruutu);
            if (t == null) return;
            LinssiOhjain.Instanssi?.Kirjaa("ihmisen matka: lamppu " + t);
            LamppuNapautettu?.Invoke(t);
        }

        /// <summary>Lasketut vanat piirtoon (kutsutaan, kun taustalaskenta on valmis).</summary>
        public void AsetaVanat(VanatTulos tulos, VirtaAineisto virrat, Ruutumaski rantamaski, VanaPiirto valmis = null)
        {
            var varjostin = Resources.Load<Shader>("Varjostimet/Vana");
            vanat = gameObject.AddComponent<VanaKerros>();
            vanat.georeferenssi = kierto.georeferenssi;
            vanat.varjostin = varjostin;
            vanat.kamera = kierto.GetComponent<Camera>();
            vanat.vahennettyLiike = LinssiOhjain.Instanssi?.VahennettyLiike ?? false;
            if (valmis != null) vanat.Aseta(valmis, rantamaski);
            else vanat.Aseta(tulos, virrat.Virrat, virrat.Vanat?.Kaista, rantamaski, Ruutumaski.Kulkumaskista(virrat.Maamaski));
        }

        void Update()
        {
            double nyt = Time.realtimeSinceStartupAsDouble * 1000;
            valot?.Paivita(nyt);
            vanat?.Paivita(vuosia, pito);
            if (valoissa && taivas != null)
            {
                // Tähdet häipyvät, kun kartta valkenee (web: tähdet vain avausjaksossa).
                float t = Mathf.Clamp01((Time.unscaledTime - valotAlkoi) / (float)(Esitysmatikka.ValojenMs / 1000));
                tahtienPeitto = 1f - t;
            }
            taivas?.Paivita(Time.unscaledDeltaTime, tahtienPeitto);
        }

        public void Musta(bool paalla, double feidiMs)
        {
            LinssiOhjain.Instanssi?.Kirjaa($"esitys: musta {paalla} ({feidiMs:F0} ms)");
            MustaKasittelija?.Invoke(paalla, feidiMs);
            Tehosteet?.Musta(paalla, feidiMs);
        }

        public void Valot(double feidiMs)
        {
            LinssiOhjain.Instanssi?.Kirjaa($"esitys: valot ({feidiMs:F0} ms)");
            valoissa = true;
            valotAlkoi = Time.unscaledTime;
            ValotKasittelija?.Invoke(feidiMs);
            Tehosteet?.Valot(feidiMs);
        }

        public void Jakso(int i, KertomusJakso jakso)
        {
            JaksoKasittelija?.Invoke(i, jakso);
            Tehosteet?.Jakso(i, jakso);
        }

        public void Kello(double v)
        {
            vuosia = v;
            KelloKasittelija?.Invoke(v);
        }

        public void SytytaKohde(string kohde)
        {
            valot?.Sytyta(kohde);
            Tehosteet?.SytytaKohde(kohde);
        }

        public void Kuva(string kohde)
        {
            kuvaKohde = kohde;
            // II ensin: kuvan alue on valmis, kun UI sijoittaa kuvan KuvaKasittelijan kutsussa.
            Tehosteet?.Kuva(kohde);
            KuvaKasittelija?.Invoke(kohde);
        }

        Vector2? Ruutupiste(string tunnus)
        {
            if (tunnus == null || kierto == null || !paikkaIndeksi.TryGetValue(tunnus, out var p)) return null;
            var kamera = kierto.GetComponent<Camera>();
            var g = kierto.georeferenssi;
            if (kamera == null || g == null) return null;
            double3 keskusU = g.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            double3 u = g.TransformEarthCenteredEarthFixedPositionToUnity(
                CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(p.Lon, p.Lat, 0)));
            Vector3 paikka = g.transform.TransformPoint((float3)u);
            Vector3 normaali = g.transform.TransformDirection((float3)math.normalize(u - keskusU));
            Vector3 kohti = kamera.transform.position - paikka;
            if (Vector3.Dot(normaali, kohti.normalized) <= 0.02f) return null;   // pallon takana
            Vector3 r = kamera.WorldToScreenPoint(paikka);
            return r.z > 0 ? new Vector2(r.x, r.y) : (Vector2?)null;
        }


        public void Pulu(string teksti) => PuluKasittelija?.Invoke(teksti);

        public void Tunne(string tunne, double voimakkuus, string jakso) => TunneKasittelija?.Invoke(tunne, voimakkuus, jakso);

        public void VirtojenPito(bool paalla) => pito = paalla;

        /// <summary>Muistista jatko: vanat heti pitona tähän kellolukemaan asti (web pidon pohja).</summary>
        public void PidonPohja(double vuosiaSitten) => vanat?.Paivita(vuosiaSitten, true);

        public void Nostot(IReadOnlyList<TutkimusNosto> nostot)
        {
            if (nostot != null)
                foreach (var n in nostot) if (n.Tunnus != null) paikkaIndeksi[n.Tunnus] = (n.Lat, n.Lon);
            LinssiOhjain.Instanssi?.Kirjaa($"tutkimus: nostot {(nostot == null ? "pois" : nostot.Count.ToString())}");
            NostotKasittelija?.Invoke(nostot);
        }

        public void Napit(bool toiminnassa) => NapitKasittelija?.Invoke(toiminnassa);

        public void Valittu(Matkakirja.Linssit.Virrat.Virta virta)
        {
            vanat?.Korosta(virta?.Tunnus);
            LinssiOhjain.Instanssi?.Kirjaa($"tutkimus: virta {virta?.Tunnus ?? "pois"}");
            ValittuKasittelija?.Invoke(virta);
        }

        public void Loppu()
        {
            LoppuKasittelija?.Invoke();
            Tehosteet?.Loppu();
        }

        void OnDestroy()
        {
            if (kierto != null) kierto.Napautettu -= Napautettu;
            if (Instanssi == this) Instanssi = null;
            valot?.Pura();
            vanat?.Pura();
            if (taivas != null) Destroy(taivas.gameObject);
        }
    }
}
