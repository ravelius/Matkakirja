// MAAPALLON VUOSI -LINSSI UNITYSSÄ (Linssiseppä 2, 28.9.2026): logiikka MaapallonVuosiLinssissä (Ydin/Vuosi),
// kuukausikuori VuosiKuoressa. Sovitin luo kuoren avatessa ja tuhoaa sen sulkiessa, hakee kerrosluettelon kerran
// istunnossa ja pyörittää palloa hitaasti, kun pelaaja ei koske siihen (web autoRotateSpeed 0,35 ≈ 2,1°/s,
// OrbitControls; vähennetty liike: ei pyöritystä).
//
// UI (Natiivi-UI): Linssi (auki oleva, muuten null) antaa tilan (Kk, KuukaudenNimi, Kerrokset, Kerros, Peitto,
// Toistaa, LahdeRivi) ja toiminnot (AsetaKuukausi, AsetaKerros, AsetaPeitto, Toisto); Muuttui-tapahtuma kertoo
// muutoksesta. Webin paneeli: ▶-toisto, kuukausiliuku 1–12 ja nimi; kerrosvalikko ("Ei kerrosta" + nimet) ja
// läpinäkyvyysliuku (pois käytöstä ilman kerrosta); lähderivi 11 px.
//
// Testikomennot (linssi-komento.txt): vuosi kk <1–12> | kerros <tunnus|pois> | peitto <0–1> | toisto 0|1 |
// pyorita 0|1 | peili <juuri|pois> | tila. Peili: ämpärin data/maapallon-vuosi/ -osoitteet luetaan annetusta
// kansiosta (simulaattori: file:///Users/Shared/Claude/pyramidi-poltto/maapallon-vuosi-2024/vienti/maapallon-vuosi/),
// kunnes Karttasepän vienti on ämpärissä (omistajan lupa).
using System;
using System.Collections;
using CesiumForUnity;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Vuosi;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public sealed class MaapallonVuosiSovitin : ILinssi
    {
        /// <summary>Automaattinen pyöritys (°/s) ja viive viimeisestä kosketuksesta (s).</summary>
        public const double PyoritysAsteita = 2.1, PyoritysViive = 3;
        const string AmpariData = MaapallonVuosiLinssi.Juuri + "data/maapallon-vuosi/";

        /// <summary>Auki oleva linssi (Natiivi-UI:n paneeli), muuten null.</summary>
        public static MaapallonVuosiLinssi Linssi { get; private set; }
        /// <summary>Linssi avautui tai sulkeutui (Natiivi-UI kytkee paneelin; null = kiinni).</summary>
        public static event Action<MaapallonVuosiLinssi> Vaihtui;
        public static bool Pyorita = true;

        readonly LinssiOhjain o;
        readonly PalloKierto kierto;
        readonly MaapallonVuosiLinssi linssi;
        readonly KuoriValitin kuori = new KuoriValitin();
        ILinssiYmparisto y;
        bool luetteloHaettu;
        double levossaAlkaen = -1;

        public MaapallonVuosiSovitin(LinssiOhjain o, PalloKierto kierto)
        {
            this.o = o;
            this.kierto = kierto;
            linssi = new MaapallonVuosiLinssi(kuori);
        }

        public LinssiTiedot Tiedot => linssi.Tiedot;
        public bool Auki => linssi.Auki;

        public void Avaa(ILinssiYmparisto ymparisto)
        {
            y = ymparisto;
            var g = kierto != null ? kierto.GetComponentInParent<CesiumGeoreference>() : null;
            if (g == null) g = UnityEngine.Object.FindAnyObjectByType<CesiumGeoreference>();
            kuori.Kuori = VuosiKuori.Luo(g);
            linssi.AloitusKk = DateTime.Now.Month;
            linssi.Avaa(ymparisto);
            levossaAlkaen = -1;
            Linssi = linssi;
            Vaihtui?.Invoke(linssi);
            if (!luetteloHaettu) o.StartCoroutine(HaeLuettelo());
            o.Kirjaa(linssi.Kuvaus());
        }

        public void Paivita()
        {
            linssi.Paivita();
            PyoritaLevossa();
        }

        public void Sulje()
        {
            linssi.Sulje();
            if (kuori.Kuori != null) UnityEngine.Object.Destroy(kuori.Kuori.gameObject);
            kuori.Kuori = null;
            Linssi = null;
            Vaihtui?.Invoke(null);
        }

        /// <summary>Hidas pyöritys itään, kun kamera on ollut levossa PyoritysViive s (ei ajoa, ei sormia, ei liukua).</summary>
        void PyoritaLevossa()
        {
            if (!Pyorita || kierto == null || y == null || y.VahennettyLiike || kuori.Kuori == null) { levossaAlkaen = -1; return; }
            double nyt = y.Aika;
            if (kierto.Liikkeessa) { levossaAlkaen = -1; return; }
            if (levossaAlkaen < 0) { levossaAlkaen = nyt; return; }
            if (nyt - levossaAlkaen < PyoritysViive) return;
            var k = y.Kamera;
            kierto.AsetaKaukaa(k.Lat, k.Lon + PyoritysAsteita * Time.unscaledDeltaTime, k.Korkeus);
        }

        IEnumerator HaeLuettelo()
        {
            string osoite = MaapallonVuosiLinssi.Juuri + MaapallonVuosiLinssi.KerrosLuettelo;
            using var p = UnityWebRequest.Get(VuosiKuori.Peili(osoite));
            p.timeout = 20;
            yield return p.SendWebRequest();
            if (p.result != UnityWebRequest.Result.Success)
            {
                o.Kirjaa($"vuosi: kerrosluettelo ei tullut ({p.error}); vain pohja");
                yield break;
            }
            try
            {
                var ohitetut = new System.Collections.Generic.List<string>();
                var kerrokset = MaapallonVuosiLinssi.LueKerrosluettelo(Matkakirja.Peli.MiniJson.Jasenna(p.downloadHandler.text), ohitetut);
                linssi.AsetaKerrokset(kerrokset);
                luetteloHaettu = true;
                o.Kirjaa($"vuosi: {kerrokset.Count} kerrosta ({string.Join(", ", kerrokset.ConvertAll(k => k.Tunnus))}){(ohitetut.Count > 0 ? ", ohitettu " + string.Join(", ", ohitetut) : "")}");
            }
            catch (Exception e) { o.Kirjaa("vuosi: kerrosluettelo: " + e.Message); }
        }

        /// <summary>Testikomento "vuosi …" (LinssiOhjain.Suorita).</summary>
        public void Komento(string[] osat)
        {
            string mita = osat.Length > 1 ? osat[1] : "tila";
            string arvo = osat.Length > 2 ? osat[2] : null;
            if (mita == "peili")
            {
                VuosiKuori.Peili = arvo == null || arvo == "pois" ? (Func<string, string>)(s => s)
                    : s => s.StartsWith(AmpariData, StringComparison.Ordinal) ? arvo.TrimEnd('/') + "/" + s.Substring(AmpariData.Length) : s;
                luetteloHaettu = false;
                if (Auki) o.StartCoroutine(HaeLuettelo());
                o.Kirjaa("vuosi: peili " + (arvo ?? "pois"));
                return;
            }
            if (mita == "pyorita" && arvo != null) Pyorita = arvo == "1";
            else if (!Auki) { o.Kirjaa("vuosi: linssi ei ole auki (linssi maapallon-vuosi)"); return; }
            else if (mita == "kk" && arvo != null) linssi.AsetaKuukausi(int.Parse(arvo));
            else if (mita == "kerros" && arvo != null) linssi.AsetaKerros(arvo == "pois" ? null : arvo);
            else if (mita == "peitto" && arvo != null) linssi.AsetaPeitto(double.Parse(arvo.Replace(',', '.'), System.Globalization.CultureInfo.InvariantCulture));
            else if (mita == "toisto" && arvo != null) linssi.Toisto(arvo == "1");
            else if (mita != "tila") { o.Kirjaa("vuosi: tuntematon " + mita); return; }
            o.Kirjaa(linssi.Kuvaus() + (kuori.Kuori != null ? ", " + kuori.Kuori.Kuvaus() : "") + $", pyöritys {Pyorita}");
        }

        /// <summary>Linssi näkee kuoren rajapinnan koko elinkaaren; varsinainen kuori syntyy vasta avatessa.</summary>
        sealed class KuoriValitin : IVuosiKuori
        {
            public VuosiKuori Kuori;
            public void Nayta(bool n) { if (Kuori != null) Kuori.Nayta(n); }
            public bool Valmis(string osoite) => Kuori != null && Kuori.Valmis(osoite);
            public bool Epaonnistui(string osoite) => Kuori == null || Kuori.Epaonnistui(osoite);
            public void Esilataa(string osoite) { if (Kuori != null) Kuori.Esilataa(osoite); }
            public void Aseta(string a, string b, float t, string k1, float a1, string k2, float a2)
            { if (Kuori != null) Kuori.Aseta(a, b, t, k1, a1, k2, a2); }
        }
    }
}
