var requiredItemMap = {};
var versionInfoProperty = 'rainbird-versioninfo';

function addInfo(entryPoint, packageFile, requireList) {
    var name = packageFile.name + '@' + packageFile.version;

    entryPoint[versionInfoProperty] = {'qualifiedName': name};
    requiredItemMap[name] = []

    requireList.forEach(function(requiredLibrary) {

        var info = requiredLibrary[versionInfoProperty];
        if (info) {
            requiredItemMap[name].push(info.qualifiedName);
        }
    });
}

function process(entryPoint, packageFile, requireList) {
    addInfo(entryPoint, packageFile, requireList);
}

function getOverview () {
    var result = '';
    Object.keys(requiredItemMap).forEach(function(key) {
        result += key + '\n'
        var list = requiredItemMap[key];
        list.forEach(function(referencedVersion) {
            result += '\t' + referencedVersion + '\n';
        });
    });

    return result;
}

module.exports.process = process;
module.exports.getOverview = getOverview;
