// E3:N LOPPU, NOUSU HOLVIN LÄPI NYKYISEEN LINNAAN (Päätoimittaja 7.10.2026; käsikirjoitus kasikirjoitus-olavinlinna-kappeli-e3.md
// vaihe 11). Siirtosepän historiamoottori kutsuu vaiheen 11 lopussa (kalkki alttarilla, liuskekivi laukussa), heijastuksella:
//   SeikkailuNousu.Aloita(Transform kamera, Vector3 lahtoMaailmassa, Action valmis)
// Kutsuja asettaa ensin DioraamaSovitin.KameraVapaa = true (Cinemachine ja olan yli eivät kirjoita kameraan); valmis() palauttaa
// ohjauksen (Pulun reunakuva ja tietokerros ovat Siirtosepän). Näkymä pysyy dioraamassa (Siirtoseppä 7.10.: kuori ja ympäristö
// ovat nykylinna), tunnelma hämäräksi (yötaivas). Reitti: Ydin/Dioraama/NousuReitti.cs (testit NousuReittiTestit).
// Dioraaman Unity-avaruus: x itä, y ylös, z = −glTF-z (DioraamaNayttamo.UnityPiste); reitti lasketaan V3:na (glTF).
using System;
using System.Collections;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;
using DV3 = Matkakirja.Linssit.Dioraama.V3;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuNousu : MonoBehaviour
    {
        /// <summary>Kappelin holvin laki (Unity y, Siirtoseppä 7.10.: lattia 9,6 + 5,6).</summary>
        public static float HolviY = 15.2f;
        /// <summary>Kellotornin seinän kaari ja sen ulkonormaali (Unity) sekä linnan keskipiste ja vaakasäde drone-kaarelle.
        /// Linnanrakentajan mitat (rakennus.json-merkki "nakyma:kellotorni-kaari" tai viesti); ennen niitä arvio.</summary>
        public static Vector3 KaariUnity = new Vector3(-40f, 18f, 10f), KaariUlosUnity = new Vector3(-1f, 0f, 0f),
            LinnaKeskiUnity = new Vector3(0f, 10f, 0f);
        public static float LinnaSade = 60f;

        static SeikkailuNousu ajossa;
        /// <summary>Käynnissä (testit ja Siirtosepän varanousu).</summary>
        public static bool Kaynnissa => ajossa != null;

        static DV3 V(Vector3 u) => new DV3(u.x, u.y, -u.z);

        /// <summary>
        /// Aloittaa nousun: kamera (Transform, jossa Camera) nousee lahtoMaailmassa-pisteestä holvin läpi, leijuu yötaivaalla ja lentää
        /// drone-kaaren Kellotornin kaaren eteen (NousuReitti.Kesto ≈ 14 s); sitten valmis(). Aiempi nousu keskeytetään.
        /// </summary>
        public static void Aloita(Transform kamera, Vector3 lahtoMaailmassa, Action valmis)
        {
            if (kamera == null) { valmis?.Invoke(); return; }
            if (ajossa != null) Destroy(ajossa.gameObject);
            var go = new GameObject("SeikkailuNousu");
            ajossa = go.AddComponent<SeikkailuNousu>();
            ajossa.StartCoroutine(ajossa.Aja(kamera, lahtoMaailmassa, valmis));
        }

        IEnumerator Aja(Transform kamera, Vector3 lahto, Action valmis)
        {
            var cam = kamera.GetComponent<Camera>();
            var nayttamo = FindAnyObjectByType<DioraamaNayttamo>();
            float alkuLahi = nayttamo != null ? nayttamo.LahiLeikkaus : 0f;
            if (nayttamo != null) nayttamo.AsetaTunnelma(true);   // yötaivas: dioraaman hämärä (taivas, aurinko, linnut)
            var reitti = new NousuReitti(V(lahto), V(lahto + kamera.forward * 5f), cam != null ? cam.fieldOfView : 60,
                HolviY, V(LinnaKeskiUnity), LinnaSade, V(KaariUnity), V(KaariUlosUnity));
            Debug.Log($"MATKAKIRJA seikkailu: nousu alkaa {lahto} → kaari {KaariUnity}, {NousuReitti.Kesto:F1} s");
            float alku = Time.unscaledTime;
            char vaihe = ' ';
            while (true)
            {
                double t = Time.unscaledTime - alku;
                var (s, k, fov, lahi, v) = reitti.Hetki(t);
                var sij = DioraamaNayttamo.UnityPiste(s);
                kamera.position = sij;
                var suunta = DioraamaNayttamo.UnityPiste(k) - sij;
                if (suunta.sqrMagnitude > 1e-6f) kamera.rotation = Quaternion.LookRotation(suunta, Vector3.up);
                if (cam != null) cam.fieldOfView = (float)fov;
                if (nayttamo != null) nayttamo.LahiLeikkaus = lahi > 0 ? (float)lahi : alkuLahi;
                if (v != vaihe) { vaihe = v; Debug.Log($"MATKAKIRJA seikkailu: nousu vaihe {v} ({t:F1} s, {sij})"); }
                if (v == 'V') break;
                yield return null;
            }
            if (nayttamo != null) nayttamo.LahiLeikkaus = alkuLahi;
            ajossa = null;
            Destroy(gameObject);
            Debug.Log("MATKAKIRJA seikkailu: nousu valmis (Kellotornin kaari)");
            valmis?.Invoke();
        }
    }
}
