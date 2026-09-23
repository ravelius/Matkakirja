// KEKSINTÖLINSSIN NÄKYMÄ Unityssä: valot pallolla (Valot.cs, webin liekki) ja
// Natiivi-UI:n koukut kellolle, paneelille, välinäytökselle ja loppusanoille.
// Valon tilat kuten webin lampunTila: ajossa palavat syttyneet ja nykyinen,
// selauksessa kaikki (tulevat himmeämpinä), lopussa kaikki palavat.
// Kartta tummuu linssin ajaksi (Tummennus.cs), ja reikä seuraa nykyistä lamppua.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Aikajana;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public class KeksinnotKerros : MonoBehaviour, IPysakkiajonNakyma
    {
        /// <summary>Kellon lukema (vuosi) joka kehys.</summary>
        public static Action<double> KelloKasittelija;
        /// <summary>Pysäkki syttyi: paneeli ja kortti (indeksi aineiston Pysakit-listaan).</summary>
        public static Action<int> PysakkiKasittelija;
        /// <summary>Välinäytös auki (Jatka-nappi kutsuu linssin Ajo.Jatka).</summary>
        public static Action<int> ValinaytosKasittelija;
        public static Action<bool> TaukoKasittelija;
        /// <summary>Kaari päättyi (loppusanat).</summary>
        public static Action LoppuKasittelija;
        /// <summary>Onko UI:ssa esittelylaatikko; ilman sitä kello käynnistyy itse.</summary>
        public static bool EsittelyUIssa;

        Valot valot;
        Tummennus tummennus;
        List<(double Lat, double Lon)> paikat;
        List<string> tunnukset;
        int nykyinen = -1;
        double kello;

        public static KeksinnotKerros Luo(PalloKierto kierto, KeksinnotAineisto a)
        {
            var go = new GameObject("KeksinnotKerros");
            go.transform.SetParent(kierto.georeferenssi.transform, false);
            var k = go.AddComponent<KeksinnotKerros>();
            k.tunnukset = a.Pysakit.Select((p, i) => i.ToString()).ToList();
            k.valot = Valot.Luo(kierto.georeferenssi,
                a.Pysakit.Select((p, i) => (i.ToString(), p.Paalu ? double.NaN : p.Lat, p.Paalu ? double.NaN : p.Lon)).ToList(),
                LinssiOhjain.Instanssi?.VahennettyLiike ?? false, kierto.GetComponent<Camera>());
            k.paikat = a.Pysakit.Select(p => p.Paalu ? (double.NaN, double.NaN) : (p.Lat, p.Lon)).ToList();
            k.tummennus = Tummennus.Luo(kierto, go.transform);
            return k;
        }

        void Update()
        {
            kello = Time.realtimeSinceStartupAsDouble * 1000;
            valot?.Paivita(kello);
        }

        void Aseta(int i, ValonVaihe v) { if (i >= 0 && i < tunnukset.Count) valot?.Tila(tunnukset[i], v, kello); }

        /// <summary>Reikä nykyisen lampun kohdalle; merkkipaalu (ei paikkaa) ja -1 = tasainen.</summary>
        void Reika(int i)
        {
            if (tummennus == null) return;
            if (i >= 0 && i < paikat.Count) tummennus.Reika(paikat[i].Lat, paikat[i].Lon);
            else tummennus.Reika(double.NaN, double.NaN);
        }

        public void Kello(double vuosi) => KelloKasittelija?.Invoke(vuosi);

        public void Sytyta(int i)
        {
            if (nykyinen >= 0 && nykyinen != i) Aseta(nykyinen, ValonVaihe.Palaa);
            Aseta(i, ValonVaihe.Nykyinen);
            nykyinen = i;
            Reika(i);
            PysakkiKasittelija?.Invoke(i);
        }

        public void Selaus(int i)
        {
            for (int k = 0; k < tunnukset.Count; k++)
                Aseta(k, i < 0 ? ValonVaihe.Sammunut : k == i ? ValonVaihe.Nykyinen : k > i ? ValonVaihe.Tuleva : ValonVaihe.Palaa);
            nykyinen = i;
            Reika(i);
            if (i >= 0) PysakkiKasittelija?.Invoke(i);
        }

        public void Valinaytos(int i) => ValinaytosKasittelija?.Invoke(i);

        public void Tauolla(bool tauolla) => TaukoKasittelija?.Invoke(tauolla);

        public void Loppu()
        {
            for (int k = 0; k < tunnukset.Count; k++) Aseta(k, ValonVaihe.Palaa);
            LoppuKasittelija?.Invoke();
        }

        void OnDestroy() => valot?.Pura();
    }
}
