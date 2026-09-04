// GUIA ABRIR STORY BOOK


Set-Location 'C:\Users\Administrador\Desktop\React_teoria_proyectos\componentsReact'
Get-NetTCPConnection -LocalPort 6006 -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { Stop-Process -Id $_ -Force }
Remove-Item -Recurse -Force node_modules\.cache\storybook -ErrorAction SilentlyContinue
$env:VITE_CONFIG_NATIVE_IGNORE_WARNING = 'true'
npm run storybook