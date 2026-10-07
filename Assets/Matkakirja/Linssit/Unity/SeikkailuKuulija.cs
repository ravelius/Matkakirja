// HISTORIAMOOTTORI: KUULIJA OLAN YLI -KAMERASSA (Päätoimittaja 7.10. 14.4x: kuulija oli pallonäkymän kamerassa, joten 3D-äänet olivat
// väärässä paikassa). AudioListener ja sen suotimet (AaniKaappaus, DioraamaLimitteri, TestiMykistys — ei kaiuttimia) pysyvät pallon
// Kamera-oliossa; sen sijaan seikkailun 3D-lähteet ovat KUULOKEHYKSEN lapsia dioraaman koordinaateissa, ja kehys siirretään joka ruutu
// niin, että dioraaman kamera osuu kuulijan paikalle ja suuntaan (kehys = kuulija · kamera⁻¹). Lähteen paikka ja suunta kuulijaan nähden
// ovat silloin täsmälleen samat kuin aktiiviseen kameraan (olan yli / veneen perä) nähden: vasen–oikea, etäisyysvaimennus, doppler pois.
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class SeikkailuKuulija
    {
        static Transform kehys;
        static AudioListener kuulija;

        public static Transform Kehys
        {
            get
            {
                if (kehys == null) kehys = new GameObject("Seikkailu kuulokehys").transform;
                return kehys;
            }
        }

        /// <summary>Kehys kuulijan ja dioraaman kameran mukaan (kutsutaan kameran päivityksen jälkeen joka ruutu seikkailussa).</summary>
        public static void Paivita(Transform kamera)
        {
            if (kamera == null) return;
            if (kuulija == null || !kuulija.isActiveAndEnabled)
            {
                kuulija = null;
                foreach (var l in Object.FindObjectsByType<AudioListener>(FindObjectsSortMode.None)) if (l.isActiveAndEnabled) { kuulija = l; break; }
                if (kuulija == null) return;
            }
            var k = Kehys;
            var r = kuulija.transform.rotation * Quaternion.Inverse(kamera.rotation);
            k.SetPositionAndRotation(kuulija.transform.position - r * kamera.position, r);
        }

        /// <summary>3D-lähde kehyksessä: logaritminen vaimennus (lähellä täysi 1,5 m:iin, kuuluu ~30 m), ei doppleria.</summary>
        public static AudioSource Lahde(string nimi, float lahiM = 1.5f, float kaukoM = 30f)
        {
            var g = new GameObject(nimi);
            g.transform.SetParent(Kehys, false);
            var a = g.AddComponent<AudioSource>();
            a.spatialBlend = 1f; a.rolloffMode = AudioRolloffMode.Logarithmic; a.minDistance = lahiM; a.maxDistance = kaukoM;
            a.dopplerLevel = 0f; a.playOnAwake = false;
            return a;
        }

        /// <summary>Lähde dioraaman maailmanpisteeseen.</summary>
        public static void Aseta(AudioSource a, Vector3 dioraamaPiste) { if (a != null) a.transform.localPosition = dioraamaPiste; }
    }
}
