// RADIOPANEELIN PINTOJEN TUONTI (Linssiseppä 24.9.2026, radiouudistus build 12): tyokalut/radiopinnat.py
// leipoo kuvat kansioon Resources/Radio/, ja tämä asettaa niiden tuonnin jokaisella tuontikerralla:
// UI-kuvat ilman mipmappeja, sRGB, alfa läpinäkyvyytenä, iOS:llä ASTC 6×6 (yhteensä noin 0,2 Mt).
// 9-slicen reunat asetetaan USS:ssä (-unity-slice-*), ei tässä.
using UnityEditor;
using UnityEngine;

namespace Matkakirja.Natiivi.Editori
{
    sealed class RadioPinnatTuonti : AssetPostprocessor
    {
        public const string Kansio = "Assets/Matkakirja/UI/Resources/Radio/";

        void OnPreprocessTexture()
        {
            if (!assetPath.StartsWith(Kansio)) return;
            var ti = (TextureImporter)assetImporter;
            ti.textureType = TextureImporterType.Default;
            ti.sRGBTexture = true;
            ti.mipmapEnabled = false;
            ti.alphaSource = TextureImporterAlphaSource.FromInput;
            ti.alphaIsTransparency = true;
            ti.wrapMode = assetPath.EndsWith("radio-viivain.png") ? TextureWrapMode.Repeat : TextureWrapMode.Clamp;
            ti.filterMode = FilterMode.Bilinear;
            ti.maxTextureSize = 1024;
            // Ei kahden potenssiin skaalausta: kotelo 1024 × 320 ja VU-levy 256 × 180 venyivät 256:een ja 128:aan
            // (diagnoosi 24.9. simulaattorissa). ASTC ei vaadi kahden potenssia.
            ti.npotScale = TextureImporterNPOTScale.None;
            ti.SetPlatformTextureSettings(new TextureImporterPlatformSettings
            {
                name = "iPhone",
                overridden = true,
                maxTextureSize = 1024,
                format = TextureImporterFormat.ASTC_6x6,
                compressionQuality = 100,
            });
        }
    }
}
