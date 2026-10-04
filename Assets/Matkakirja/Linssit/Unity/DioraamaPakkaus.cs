// DIORAAMAN HÄVIÖTÖN PAKKAUS (Natiiviseppä 5.10.2026, juna 143; Päätoimittajan päätös 02.0x): linnapaketin ASTC/glb/json
// tulevat ämpäristä Brotli-pakattuina (<polku>.br, Linnanrakentajan pakkaaja q11, lgwin 24, koko paketti 1025 → 605 Mt).
// Manifestin merkintä { polku, sha256, tavuja, br: { sha256, tavuja } }: ylätaso on PURETTU tiedosto (välimuistin avain ja
// puskurin koko), br on ladattava pakattu. Alkuperäiset jäävät ämpäriin (vanhat TF-versiot ja peili lataavat niitä).
// Purku iOS:n omalla Compression-kehyksellä (Plugins/iOS/MatkakirjaPurku.mm, COMPRESSION_BROTLI), ei kolmannen osapuolen
// koodia. Muualla (editori, Mac) purkua ei ole: DioraamaLevyvalimuisti lataa silloin pakkaamattoman polun.
// Kutsutaan taustasäikeestä (Task.Run); ei Unityn API:a.
using System;
#if UNITY_IOS && !UNITY_EDITOR
using System.Runtime.InteropServices;
#endif

namespace Matkakirja.Natiivi
{
    public static class DioraamaPakkaus
    {
        /// <summary>Manifestin pakkauskenttä ja tiedoston pääte.</summary>
        public const string Kentta = "br", Paate = ".br";

        /// <summary>Kehittäjän testikytkin ("poikki pakkaus pois|paalle"): pois = ladataan aina pakkaamaton polku.</summary>
        public static bool Sallittu = true;

#if UNITY_IOS && !UNITY_EDITOR
        public static bool Kaytossa => Sallittu;
        [DllImport("__Internal")] static extern long MatkakirjaPurku_Puskuri(int algoritmi, byte[] lahde, int pituus, byte[] kohde, long kohdePituus);
        [DllImport("__Internal")] static extern int MatkakirjaPurku_Tiedosto(int algoritmi, string lahde, string kohde, out long kirjoitettu);
#else
        public static bool Kaytossa => false;
#endif

        /// <summary>Purkaa muistissa olevan pakatun tiedoston täsmälleen <paramref name="tavuja"/>-kokoiseksi. null = virhe tai koko
        /// ei täsmää (kutsuja lataa pakkaamattoman polun).</summary>
        public static byte[] PuraPuskuri(byte[] pakattu, long tavuja)
        {
#if UNITY_IOS && !UNITY_EDITOR
            if (pakattu == null || pakattu.Length == 0 || tavuja <= 0 || tavuja >= int.MaxValue) return null;
            var kohde = new byte[tavuja];
            long n = MatkakirjaPurku_Puskuri(1, pakattu, pakattu.Length, kohde, kohde.LongLength);
            return n == tavuja ? kohde : null;
#else
            return null;
#endif
        }

        /// <summary>Virtapurku tiedostosta tiedostoon (1 Mt:n puskurit; 89 Mt:n atlas ei käy muistissa kokonaan). true vain, jos
        /// virta päättyi oikein ja purettu koko on <paramref name="tavuja"/>.</summary>
        public static bool PuraTiedosto(string lahde, string kohde, long tavuja)
        {
#if UNITY_IOS && !UNITY_EDITOR
            int r = MatkakirjaPurku_Tiedosto(1, lahde, kohde, out long n);
            return r == 0 && (tavuja < 0 || n == tavuja);
#else
            return false;
#endif
        }
    }
}
