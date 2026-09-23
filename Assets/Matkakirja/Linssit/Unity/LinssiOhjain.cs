// LINSSIOHJAIN: linssien Unity-kytkentä (Linssiseppä 23.9.2026).
//
// KÄYNNISTYY ITSE (RuntimeInitializeOnLoadMethod, kuten PeliOhjain): etsii
// PalloKierron, luo olion "LinssiOhjain", rekisteröi linssit ja kutsuu
// rekisterin Paivita-metodia joka kehys. Rakennus.cs:ään ei tarvita muutoksia.
//
// Tämä tiedosto on Assembly-CSharpissa (ei asmdefiä), jotta Natiivi-UI näkee
// ohjaimen suoraan. Linssien logiikka on puhtaassa ytimessä (Linssit/Ydin,
// asmdef Matkakirja.Linssit.Ydin); tässä on vain sovitin sen ja kartan välillä:
//   - kerrokset → KarttaKerrokset.Instanssi (Natiiviseppä, RAJAPINTA.md luku 4)
//   - kamera    → PalloKierto (RAJAPINTA.md luku 1)
//   - peite, musiikki ja vähennetty liike → koukut, jotka UI ja äänet asettavat
//
// TESTIKOMENNOT ilman UI:ta: Documents/linssi-komento.txt, rivi kerrallaan
// "linssi <id>" (vaihtokytkin), "linssi pois", "linssit" (luettelo lokiin).
// Tulos lokiin ja Documents/linssi-loki.txt:hen.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using CesiumForUnity;
using Matkakirja.Linssit;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public class LinssiOhjain : MonoBehaviour, ILinssiYmparisto
    {
        public static LinssiOhjain Instanssi { get; private set; }

        /// <summary>Linssirekisteri (Natiivi-UI:n valitsin lukee tätä).</summary>
        public static Linssirekisteri Rekisteri => Instanssi?.rekisteri;

        /// <summary>Tumma odotuspeite (Natiivi-UI asettaa). Ilman sitä peite on vain lokissa.</summary>
        public static Action<bool> PeiteKasittelija;
        /// <summary>Taustamusiikin pito (Pelikoodarin äänet asettavat).</summary>
        public static Action<bool> MusiikkiKasittelija;
        /// <summary>Vähennetty liike (iOS UIAccessibilityIsReduceMotionEnabled, liitännäinen).</summary>
        public static Func<bool> VahennettyLiikeKysely;

        PalloKierto kierto;
        Linssirekisteri rekisteri;
        KerrosSovitin kerrokset;
        string komentoPolku, lokiPolku;
        float komentoKello;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        public static void Kaynnista()
        {
            if (Instanssi != null) return;
            var kierto = FindAnyObjectByType<PalloKierto>();
            if (kierto == null)
            {
                Debug.LogWarning("MATKAKIRJA linssit: kohtauksessa ei ole PalloKiertoa, linssit eivät käynnisty");
                return;
            }
            var go = new GameObject("LinssiOhjain");
            go.AddComponent<LinssiOhjain>().Alusta(kierto);
        }

        void Alusta(PalloKierto k)
        {
            Instanssi = this;
            kierto = k;
            kerrokset = new KerrosSovitin();
            rekisteri = new Linssirekisteri(this);
            rekisteri.Lisaa(new Topografia());
            rekisteri.Vaihtui += l => Kirjaa("auki: " + (l?.Tiedot.Id ?? "ei mitään"));
            komentoPolku = Path.Combine(Application.persistentDataPath, "linssi-komento.txt");
            lokiPolku = Path.Combine(Application.persistentDataPath, "linssi-loki.txt");
        }

        void Update()
        {
            kerrokset.Kytke();
            rekisteri.Paivita();
            komentoKello -= Time.unscaledDeltaTime;
            if (komentoKello <= 0f) { komentoKello = 0.5f; LueKomennot(); }
        }

        void OnDestroy()
        {
            rekisteri?.Sulje();
            kerrokset?.Irrota();
            if (Instanssi == this) Instanssi = null;
        }

        // ── ILinssiYmparisto ──────────────────────────────────────────────

        public IKarttaKerrokset Kerrokset => kerrokset;

        public Nakyma Kamera => new Nakyma(kierto.leveys, kierto.pituus, kierto.korkeus, kierto.kallistus);

        public void AjaKamera(Nakyma kohde, float kestoS) =>
            kierto.Aja(kohde.Lat, kohde.Lon, kohde.Korkeus, Mathf.Max(0.01f, kestoS), null);

        /// <summary>
        /// Pelin oma loitonnuksen katto on jo koko pallo (PalloKierto.MaxKorkeus),
        /// joten topografian pyyntö ei muuta mitään. Tiukempi katto tarvitaan
        /// vasta, jos jokin linssi rajaa loitonnusta; silloin PalloKierto saa asettimen.
        /// </summary>
        public void ZoomiKatto(double? maxKorkeus) { }

        public double KokoPallonKorkeus => kierto.MaxKorkeus();

        public void Pelikerrokset(bool nakyvissa)
        {
            var k = KarttaKerrokset.Instanssi;
            if (k == null) return;
            k.Nakyvyys("kaupungit", nakyvissa);
            k.Nakyvyys("nimiot", nakyvissa);
        }

        public void Peite(bool paalla)
        {
            Kirjaa("peite " + (paalla ? "päälle" : "pois"));
            PeiteKasittelija?.Invoke(paalla);
        }

        public void MusiikkiPitoon(bool pidossa) => MusiikkiKasittelija?.Invoke(pidossa);

        public bool VahennettyLiike => VahennettyLiikeKysely?.Invoke() ?? false;

        public double Aika => Time.realtimeSinceStartupAsDouble;

        // ── Testikomennot ─────────────────────────────────────────────────

        void LueKomennot()
        {
            if (!File.Exists(komentoPolku)) return;
            string[] rivit;
            try { rivit = File.ReadAllLines(komentoPolku); File.Delete(komentoPolku); }
            catch (IOException e) { Debug.LogWarning("MATKAKIRJA linssi-komento: " + e.Message); return; }
            foreach (var rivi in rivit.Select(r => r.Trim()).Where(r => r.Length > 0)) Suorita(rivi);
        }

        void Suorita(string rivi)
        {
            var osat = rivi.Split(' ');
            try
            {
                if (osat[0] == "linssit")
                    Kirjaa(string.Join(", ", rekisteri.Kaikki.Select(l => l.Tiedot.Id)));
                else if (osat[0] == "linssi" && osat.Length > 1 && osat[1] == "pois")
                    rekisteri.Sulje();
                else if (osat[0] == "linssi" && osat.Length > 1)
                    rekisteri.Valitse(osat[1]);
                else
                    Kirjaa("tuntematon komento: " + rivi);
            }
            catch (ArgumentException e) { Kirjaa("virhe: " + e.Message); }
        }

        void Kirjaa(string teksti)
        {
            Debug.Log("MATKAKIRJA linssit: " + teksti);
            try { File.AppendAllText(lokiPolku, $"{Aika:F2} {teksti}\n"); } catch (IOException) { }
        }

        // ── Kerrokset ─────────────────────────────────────────────────────

        /// <summary>
        /// IKarttaKerrokset KarttaKerrokset-komponentin päälle. Kerroksen tila
        /// seurataan KerrosValmis- ja KerrosEpaonnistui-tapahtumista.
        /// KarttaKerrokset.Instanssi on null ennen kohtauksen latausta, joten
        /// tapahtumat kytketään ensimmäisellä kehyksellä, kun se on olemassa.
        /// </summary>
        sealed class KerrosSovitin : IKarttaKerrokset
        {
            readonly Dictionary<string, KerrosTila> tilat = new Dictionary<string, KerrosTila>();
            KarttaKerrokset kytketty;

            public void Kytke()
            {
                var k = KarttaKerrokset.Instanssi;
                if (k == kytketty) return;
                Irrota();
                kytketty = k;
                if (k == null) return;
                k.KerrosValmis += Valmis;
                k.KerrosEpaonnistui += Epaonnistui;
            }

            public void Irrota()
            {
                if (kytketty == null) return;
                kytketty.KerrosValmis -= Valmis;
                kytketty.KerrosEpaonnistui -= Epaonnistui;
                kytketty = null;
            }

            void Valmis(string avain) { if (tilat.ContainsKey(avain)) tilat[avain] = KerrosTila.Valmis; }
            void Epaonnistui(string avain) { if (tilat.ContainsKey(avain)) tilat[avain] = KerrosTila.Luovutti; }

            public void LisaaRasteri(string avain, Rasteri r)
            {
                Kytke();
                if (kytketty == null) { tilat[avain] = KerrosTila.Luovutti; return; }
                tilat[avain] = KerrosTila.Latautuu;
                kytketty.LisaaRasteri(avain, r.Url,
                    r.Projektio == Projektio.Geographic
                        ? CesiumUrlTemplateRasterOverlayProjection.Geographic
                        : CesiumUrlTemplateRasterOverlayProjection.WebMercator,
                    r.MinTaso, r.MaxTaso, r.Alfa);
            }

            public void Poista(string avain)
            {
                tilat.Remove(avain);
                kytketty?.PoistaRasteri(avain);
            }

            public void Nakyvyys(string avain, bool nakyvissa) => KarttaKerrokset.Instanssi?.Nakyvyys(avain, nakyvissa);

            public KerrosTila Tila(string avain) =>
                tilat.TryGetValue(avain, out var t) ? t : KerrosTila.Luovutti;
        }
    }
}
