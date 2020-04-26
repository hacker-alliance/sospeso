Compress-Archive -Update -Path ./api/vendor/* -DestinationPath ./zips/vendor.zip
ibmcloud fn action update vendor .\zips\vendor.zip --kind nodejs:10

Compress-Archive -Update -Path ./api/hello/* -DestinationPath ./zips/hello.zip
ibmcloud fn action update hello .\zips\hello.zip --kind nodejs:10

Compress-Archive -Update -Path ./api/item/* -DestinationPath ./zips/item.zip
ibmcloud fn action update item .\zips\item.zip --kind nodejs:10

Compress-Archive -Update -Path ./api/vendor2/* -DestinationPath ./zips/vendor2.zip
ibmcloud fn action update vendor2 .\zips\vendor2.zip --kind nodejs:10