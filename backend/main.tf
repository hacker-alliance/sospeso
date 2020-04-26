data "archive_file" "hello-zip" {
  type        = "zip"
  source_dir  = "api/hello"
  output_path = "zips/hello.zip"
}

resource "ibm_function_action" "hello-function" {
  name = "hello"

  exec {
    kind = "nodejs:10"
  }
}

data "archive_file" "vendor-zip" {
  type        = "zip"
  source_dir  = "api/vendor"
  output_path = "zips/vendor.zip"
}

resource "ibm_function_action" "vendor-function" {
  name = "vendor"
  exec {
    kind = "nodejs:10"
  }
}
/*
resource "null_resource" "vendor-null" {
  depends_on = [
    ibm_function_action.vendor-function,
  ]
  provisioner "local-exec" {
    command = "ibmcloud fn action update vendor ./zips/vendor.zip --kind nodejs:10"

  }
}
*/
