// iOS-käännöksen jälkikäsittely lehtikuorelle (osa C, Pelikoodari 23.9.2026).
//
// Linkittää WebKit.frameworkin UnityFramework-kohteeseen, jonne Unity
// kääntää Plugins/iOS/MatkakirjaLehti.mm:n. Unityn Xcode-pohjassa
// UnityFramework-kohteella ei ole CLANG_ENABLE_MODULES-asetusta, joten
// #import <WebKit/WebKit.h> ei linkitä kehystä automaattisesti; ilman tätä
// linkitys kaatuu (_OBJC_CLASS_$_WKWebView puuttuu).
//
// Vaihtoehto samalle: .mm-tiedoston Inspector → Platform settings → iOS →
// Framework dependencies → WebKit. Tämä skripti tekee saman koodina, eikä
// .meta-tiedoston asetus pääse katoamaan.
//
// Sijainti: Assets/.../Editor/ -kansio (tai editori-asmdef), koska
// UnityEditor.iOS.Xcode on vain editorissa ja vain iOS-tuen kanssa.
#if UNITY_IOS
using UnityEditor;
using UnityEditor.Callbacks;
using UnityEditor.iOS.Xcode;

namespace Matkakirja.Natiivi.Editori
{
    public static class LehtiKuoriXcode
    {
        [PostProcessBuild(100)]
        public static void Jalkikasittele(BuildTarget kohde, string polku)
        {
            if (kohde != BuildTarget.iOS) return;
            var projektinPolku = PBXProject.GetPBXProjectPath(polku);
            var projekti = new PBXProject();
            projekti.ReadFromFile(projektinPolku);
            var kehys = projekti.GetUnityFrameworkTargetGuid();
            // weak = false: WKWebView on ollut iOS:ssä versiosta 8 asti.
            projekti.AddFrameworkToProject(kehys, "WebKit.framework", false);
            projekti.WriteToFile(projektinPolku);
        }
    }
}
#endif
