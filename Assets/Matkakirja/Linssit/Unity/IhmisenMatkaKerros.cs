// IHMISEN MATKAN NÄKYMÄ Unityssä (IEsityksenNakyma): vanat pallolla
// (VanaKerros), löytöpaikkojen valot (Valot), tähtitaivas avausjaksossa ja
// Natiivi-UI:n koukut mustalle ruudulle, kertomuksen tekstille, kellolle,
// kuville, pulun välihuomioille ja lopulle.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Virrat;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public class IhmisenMatkaKerros : MonoBehaviour, IEsityksenNakyma
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

        PalloKierto kierto;
        Matkakirja.Natiivi.Valot valot;
        VanaKerros vanat;
        Tahtitaivas taivas;
        double vuosia = 300000;
        bool pito, valoissa;
        float tahtienPeitto = 1f, valotAlkoi = -1f;

        public static IhmisenMatkaKerros Luo(PalloKierto kierto, IReadOnlyList<Loytopaikka> paikat)
        {
            var g = kierto.georeferenssi;
            var go = new GameObject("IhmisenMatkaKerros");
            go.transform.SetParent(g.transform, false);
            var k = go.AddComponent<IhmisenMatkaKerros>();
            k.kierto = kierto;
            bool vahennetty = LinssiOhjain.Instanssi?.VahennettyLiike ?? false;
            k.valot = Matkakirja.Natiivi.Valot.Luo(g, paikat.Select(p => (p.Tunnus, p.Lat, p.Lon)).ToList(), vahennetty, kierto.GetComponent<Camera>());
            k.taivas = Tahtitaivas.Luo(g, 1, vahennetty);
            return k;
        }

        /// <summary>Lasketut vanat piirtoon (kutsutaan, kun taustalaskenta on valmis).</summary>
        public void AsetaVanat(VanatTulos tulos, VirtaAineisto virrat, Ruutumaski rantamaski)
        {
            var varjostin = Resources.Load<Shader>("Varjostimet/Vana");
            vanat = gameObject.AddComponent<VanaKerros>();
            vanat.georeferenssi = kierto.georeferenssi;
            vanat.varjostin = varjostin;
            vanat.kamera = kierto.GetComponent<Camera>();
            vanat.vahennettyLiike = LinssiOhjain.Instanssi?.VahennettyLiike ?? false;
            vanat.Aseta(tulos, virrat.Virrat, virrat.Vanat?.Kaista, rantamaski, Ruutumaski.Kulkumaskista(virrat.Maamaski));
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

        public void Musta(bool paalla, double feidiMs) => MustaKasittelija?.Invoke(paalla, feidiMs);

        public void Valot(double feidiMs)
        {
            valoissa = true;
            valotAlkoi = Time.unscaledTime;
            ValotKasittelija?.Invoke(feidiMs);
        }

        public void Jakso(int i, KertomusJakso jakso) => JaksoKasittelija?.Invoke(i, jakso);

        public void Kello(double v)
        {
            vuosia = v;
            KelloKasittelija?.Invoke(v);
        }

        public void SytytaKohde(string kohde) => valot?.Sytyta(kohde);

        public void Kuva(string kohde) => KuvaKasittelija?.Invoke(kohde);

        public void Pulu(string teksti) => PuluKasittelija?.Invoke(teksti);

        public void Tunne(string tunne, double voimakkuus, string jakso) => TunneKasittelija?.Invoke(tunne, voimakkuus, jakso);

        public void VirtojenPito(bool paalla) => pito = paalla;

        public void Loppu() => LoppuKasittelija?.Invoke();

        void OnDestroy()
        {
            valot?.Pura();
            vanat?.Pura();
            if (taivas != null) Destroy(taivas.gameObject);
        }
    }
}
